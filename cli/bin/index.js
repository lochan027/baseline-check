#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const globby = require('globby');
const chalk = require('chalk');
const { features } = require('web-features');
const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

// Inline feature detection (self-contained for CLI distribution)
const JS_FEATURES = {
  'optional-chaining': (node) => node.type === 'OptionalMemberExpression' || node.type === 'OptionalCallExpression',
  'nullish-coalescing': (node) => node.type === 'LogicalExpression' && node.operator === '??',
  'private-class-fields': (node) => node.type === 'ClassPrivateProperty' || node.type === 'PrivateName',
  'dynamic-import': (node) => node.type === 'Import',
  'bigint': (node) => node.type === 'BigIntLiteral'
};

const CSS_FEATURES = {
  'nesting': /&\s*{|&\s*[a-zA-Z]/,
  'has': /:has\(/,
  'container-queries': /@container/,
  'cascade-layers': /@layer/,
  'subgrid': /subgrid/,
  'grid': /display:\s*grid|grid-template/,
  'flexbox': /display:\s*flex|flex-direction/,
  'custom-properties': /--[a-zA-Z-]+:/
};

const HTML_FEATURES = {
  'dialog': /<dialog/i,
  'details': /<details/i,
  'web-components': /<[a-z]+-[a-z-]+/i,
  'picture-element': /<picture/i
};

function parseJSFeatures(code) {
  const foundFeatures = new Set();
  
  try {
    const ast = babelParser.parse(code, {
      sourceType: 'unambiguous',
      plugins: [
        'typescript',
        'jsx',
        'classProperties',
        'privateIn',
        'decorators-legacy',
        'dynamicImport',
        'optionalChaining',
        'nullishCoalescingOperator',
        'bigInt',
        'topLevelAwait'
      ]
    });

    traverse(ast, {
      enter(path) {
        const node = path.node;
        for (const [featureId, detector] of Object.entries(JS_FEATURES)) {
          if (detector(node)) {
            foundFeatures.add(featureId);
          }
        }
      }
    });
  } catch (error) {
    // Ignore parse errors for demo
  }

  return Array.from(foundFeatures);
}

function parseCSSFeatures(code) {
  const foundFeatures = new Set();
  
  try {
    for (const [featureId, pattern] of Object.entries(CSS_FEATURES)) {
      if (pattern.test(code)) {
        foundFeatures.add(featureId);
      }
    }
  } catch (error) {
    // Ignore parse errors
  }

  return Array.from(foundFeatures);
}

function parseHTMLFeatures(code) {
  const foundFeatures = new Set();
  
  try {
    for (const [featureId, pattern] of Object.entries(HTML_FEATURES)) {
      if (pattern.test(code)) {
        foundFeatures.add(featureId);
      }
    }
  } catch (error) {
    // Ignore parse errors
  }

  return Array.from(foundFeatures);
}

function getFeatureBaselineYear(featureId) {
  const feature = features[featureId];
  if (!feature || !feature.status || !feature.status.baseline) return null;
  if (feature.status.baseline === false) return 9999;
  if (feature.status.baseline === 'low' && feature.status.baseline_low_date) {
    return new Date(feature.status.baseline_low_date).getFullYear();
  }
  if (feature.status.baseline === 'high' && feature.status.baseline_high_date) {
    return new Date(feature.status.baseline_high_date).getFullYear();
  }
  return null;
}

function checkFeatures(usedFeatures, baselineYear) {
  const errors = [];
  const safe = [];
  
  for (const featureId of usedFeatures) {
    const requiredYear = getFeatureBaselineYear(featureId);
    if (requiredYear && requiredYear > baselineYear) {
      errors.push({ feature: featureId, required: requiredYear });
    } else {
      safe.push({ feature: featureId, required: requiredYear || 'Unknown' });
    }
  }
  
  return { errors, safe };
}

const CONFIG_FILE = 'baseline.config.json';

function readConfig() {
  const configPath = path.resolve(process.cwd(), CONFIG_FILE);
  if (!fs.existsSync(configPath)) {
    console.error(chalk.red(`❌ Missing ${CONFIG_FILE} at project root.`));
    console.error(chalk.gray(`Create one with: { "baseline": "2023" }`));
    process.exit(1);
  }
  
  try {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    if (!config.baseline) {
      console.error(chalk.red(`❌ Missing 'baseline' property in ${CONFIG_FILE}.`));
      process.exit(1);
    }
    return config;
  } catch (error) {
    console.error(chalk.red(`❌ Invalid JSON in ${CONFIG_FILE}: ${error.message}`));
    process.exit(1);
  }
}

function getAllFiles() {
  return globby.sync([
    '**/*.{js,ts,css,html}', 
    '!node_modules/**',
    '!**/node_modules/**',
    '!dist/**',
    '!build/**'
  ]);
}

function scanFiles() {
  const files = getAllFiles();
  const allUsedFeatures = new Set();
  
  console.log(chalk.blue(`📁 Scanning ${files.length} files...`));
  
  for (const file of files) {
    const ext = path.extname(file);
    const code = fs.readFileSync(file, 'utf8');
    let features = [];
    
    if (ext === '.js' || ext === '.ts') {
      features = parseJSFeatures(code);
    } else if (ext === '.css') {
      features = parseCSSFeatures(code);
    } else if (ext === '.html') {
      features = parseHTMLFeatures(code);
    }
    
    features.forEach(f => allUsedFeatures.add(f));
  }
  
  return Array.from(allUsedFeatures);
}

function generateReport(features, baselineYear, result) {
  let report = `# Baseline Feature Report\n\n`;
  report += `**Project Baseline**: ${baselineYear}\n`;
  report += `**Generated**: ${new Date().toISOString()}\n\n`;
  
  if (features.length === 0) {
    report += `No modern web features detected.\n`;
    return report;
  }
  
  report += `## Features Found\n\n`;
  report += `| Feature | Required Baseline | Status |\n`;
  report += `|---------|------------------|--------|\n`;
  
  [...result.safe, ...result.errors].forEach(item => {
    const status = result.errors.includes(item) ? '❌ Unsafe' : '✅ Safe';
    report += `| ${item.feature} | ${item.required} | ${status} |\n`;
  });
  
  return report;
}

function main() {
  const args = process.argv.slice(2);
  const reportMode = args.includes('--report');
  const helpMode = args.includes('--help') || args.includes('-h');
  
  if (helpMode) {
    console.log(`
${chalk.bold('baseline-check')} - Prevent unsafe modern web features

${chalk.bold('Usage:')}
  npx baseline-check          Check features against baseline
  npx baseline-check --report Generate baseline-report.md
  npx baseline-check --help   Show this help

${chalk.bold('Configuration:')}
  Create baseline.config.json:
  {
    "baseline": "2023"
  }
`);
    process.exit(0);
  }
  
  const config = readConfig();
  const baselineYear = parseInt(config.baseline, 10);
  
  console.log(chalk.blue(`🎯 Checking against Baseline ${baselineYear}...`));
  
  const usedFeatures = scanFiles();
  const result = checkFeatures(usedFeatures, baselineYear);
  
  if (reportMode) {
    const report = generateReport(usedFeatures, baselineYear, result);
    fs.writeFileSync('baseline-report.md', report, 'utf8');
    console.log(chalk.blue('📄 Generated baseline-report.md'));
  }
  
  if (result.errors.length > 0) {
    console.log(chalk.red(`\n❌ Found ${result.errors.length} unsafe feature(s):\n`));
    result.errors.forEach(err => {
      console.error(chalk.red(`   • Feature "${err.feature}" requires Baseline ${err.required}. Project is Baseline ${baselineYear}.`));
    });
    console.log('');
    process.exit(1);
  } else {
    console.log(chalk.green(`✅ All features are safe for Baseline ${baselineYear}.`));
    if (usedFeatures.length > 0) {
      console.log(chalk.gray(`   Found ${usedFeatures.length} feature(s): ${usedFeatures.join(', ')}`));
    }
    process.exit(0);
  }
}

main();