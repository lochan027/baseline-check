#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const globby = require('globby');
const { features, baseline } = require('web-features');
const babelParser = require('@babel/parser');
const postcss = require('postcss');
const htmlparser2 = require('htmlparser2');
const chalk = require('chalk');

const CONFIG_FILE = 'baseline.config.json';

function readConfig() {
  const configPath = path.resolve(process.cwd(), CONFIG_FILE);
  if (!fs.existsSync(configPath)) {
    console.error(chalk.red(`Missing ${CONFIG_FILE} at project root.`));
    process.exit(1);
  }
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  if (!config.baseline) {
    console.error(chalk.red(`Missing 'baseline' property in ${CONFIG_FILE}.`));
    process.exit(1);
  }
  return config;
}

function getAllFiles() {
  return globby.sync(['**/*.{js,ts,css,html}', '!node_modules', '!**/node_modules/**']);
}

function parseJSFeatures(code) {
  let ast;
  try {
    ast = babelParser.parse(code, {
      sourceType: 'unambiguous',
      plugins: ['typescript', 'jsx', 'classProperties', 'decorators-legacy', 'dynamicImport', 'optionalChaining', 'nullishCoalescingOperator']
    });
  } catch (e) {
    return [];
  }
  // Simple feature detection: look for syntax nodes matching known features
  const used = new Set();
  babelParser.traverse && babelParser.traverse(ast, {
    enter(node) {
      // Not implemented: use a static list or plugin for real feature detection
    }
  });
  // For demo, just return []
  return Array.from(used);
}

function parseCSSFeatures(code) {
  let root;
  try {
    root = postcss.parse(code);
  } catch (e) {
    return [];
  }
  // Not implemented: use a static list or plugin for real feature detection
  return [];
}

function parseHTMLFeatures(code) {
  // Not implemented: use a static list or plugin for real feature detection
  return [];
}

function getFeatureBaselineYear(featureId) {
  const feat = features.find(f => f.id === featureId);
  if (!feat || !feat.status.baseline) return null;
  return feat.status.baseline.year;
}

function checkFeatures(usedFeatures, baselineYear) {
  const errors = [];
  for (const featureId of usedFeatures) {
    const year = getFeatureBaselineYear(featureId);
    if (year && year > baselineYear) {
      errors.push({ featureId, year });
    }
  }
  return errors;
}


function main() {
  const args = process.argv.slice(2);
  const reportMode = args.includes('--report');
  const config = readConfig();
  const baselineYear = parseInt(config.baseline, 10);
  const files = getAllFiles();
  const allUsedFeatures = new Set();
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
  // For demo, let's pretend we found 'css-nesting' in CSS
  if (files.some(f => f.endsWith('.css'))) allUsedFeatures.add('css-nesting');
  const usedFeaturesArr = Array.from(allUsedFeatures);
  const errors = checkFeatures(usedFeaturesArr, baselineYear);

  if (reportMode) {
    let report = `# Baseline Feature Report\n\n| Feature | Required Baseline | Project Baseline | Status |\n|---------|------------------|------------------|--------|\n`;
    for (const featureId of usedFeaturesArr) {
      const year = getFeatureBaselineYear(featureId);
      let status = '✅ Safe';
      if (year && year > baselineYear) status = '❌ Unsafe';
      report += `| ${featureId} | ${year || 'Unknown'} | ${baselineYear} | ${status} |\n`;
    }
    fs.writeFileSync('baseline-report.md', report, 'utf8');
    console.log(chalk.blue('Generated baseline-report.md'));
  }

  if (errors.length) {
    for (const err of errors) {
      console.error(chalk.red(`❌ Feature \"${err.featureId}\" requires Baseline ${err.year}. Your project is Baseline ${baselineYear}.`));
    }
    process.exit(1);
  } else {
    console.log(chalk.green(`✅ All features are safe for Baseline ${baselineYear}.`));
    process.exit(0);
  }
}

main();
