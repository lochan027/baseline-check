#!/usr/bin/env node

/**
 * Demo script for baseline-check
 * This script demonstrates both safe and unsafe scenarios
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 baseline-check Demo\n');

// Create demo files
const demoDir = path.join(__dirname, 'demo-project');
if (!fs.existsSync(demoDir)) {
  fs.mkdirSync(demoDir, { recursive: true });
}

// Create baseline config
const safeConfig = { baseline: "2020" };
const unsafeConfig = { baseline: "2022" };

// Demo files with different feature sets
const safeJS = `
// Safe features for Baseline 2020
const data = { user: 'Alice' };
const name = data.user || 'Anonymous';

class SimpleClass {
  constructor(value) {
    this.value = value;
  }
}
`;

const unsafeJS = `
// Unsafe features for Baseline 2022
const user = data?.user?.name ?? 'Anonymous';

class ModernClass {
  #privateField = 'secret';
  
  getPrivate() {
    return this.#privateField;
  }
}
`;

const unsafeCSS = `
.container {
  display: grid;
  
  /* CSS Nesting - requires Baseline 2024 */
  .nested {
    color: blue;
    
    &:hover {
      color: red;
    }
  }
}

/* :has() selector - requires Baseline 2024 */
.parent:has(.child) {
  background: yellow;
}
`;

function runDemo(config, jsCode, cssCode, title) {
  console.log(`\n📋 ${title}`);
  console.log('─'.repeat(50));
  
  // Write config
  fs.writeFileSync(
    path.join(demoDir, 'baseline.config.json'),
    JSON.stringify(config, null, 2)
  );
  
  // Write JS file
  fs.writeFileSync(path.join(demoDir, 'app.js'), jsCode);
  
  // Write CSS file if provided
  if (cssCode) {
    fs.writeFileSync(path.join(demoDir, 'styles.css'), cssCode);
  }
  
  try {
    // Run baseline-check
    const result = execSync('node ../cli/bin/index.js', { 
      cwd: demoDir,
      encoding: 'utf8',
      stdio: 'pipe'
    });
    console.log(result);
  } catch (error) {
    console.log(error.stdout);
    if (error.status === 1) {
      console.log('(Build would fail in CI/CD)');
    }
  }
}

// Demo 1: Safe configuration
runDemo(
  safeConfig,
  safeJS,
  null,
  'Demo 1: Safe Features (Baseline 2020)'
);

// Demo 2: Unsafe configuration
runDemo(
  unsafeConfig,
  unsafeJS,
  unsafeCSS,
  'Demo 2: Unsafe Features (Baseline 2022)'
);

// Generate report demo
console.log('\n📊 Generating Report Demo');
console.log('─'.repeat(50));

try {
  execSync('node ../cli/bin/index.js --report', {
    cwd: demoDir,
    stdio: 'inherit'
  });
  
  if (fs.existsSync(path.join(demoDir, 'baseline-report.md'))) {
    console.log('\n📄 Generated Report Content:');
    console.log('─'.repeat(30));
    const report = fs.readFileSync(path.join(demoDir, 'baseline-report.md'), 'utf8');
    console.log(report);
  }
} catch (error) {
  console.log('Report generated with warnings');
}

// Cleanup
fs.rmSync(demoDir, { recursive: true, force: true });

console.log('\n✨ Demo complete!');
console.log('\nNext steps:');
console.log('1. Install CLI: npm install -g baseline-check');
console.log('2. Try playground: npm run dev:site');
console.log('3. Add to your project with baseline.config.json');