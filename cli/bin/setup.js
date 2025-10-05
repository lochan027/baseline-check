#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up baseline-check...\n');

// Create example config if it doesn't exist
const configPath = path.join(process.cwd(), 'baseline.config.json');
if (!fs.existsSync(configPath)) {
  const exampleConfig = {
    baseline: "2023"
  };
  fs.writeFileSync(configPath, JSON.stringify(exampleConfig, null, 2));
  console.log('✅ Created baseline.config.json');
}

// Create .github/workflows directory and baseline.yml if it doesn't exist
const workflowDir = path.join(process.cwd(), '.github', 'workflows');
const workflowPath = path.join(workflowDir, 'baseline.yml');

if (!fs.existsSync(workflowPath)) {
  if (!fs.existsSync(workflowDir)) {
    fs.mkdirSync(workflowDir, { recursive: true });
  }
  
  const workflowContent = `name: Baseline Check

on:
  push:
    branches: ["*"]
  pull_request:
    branches: ["*"]

jobs:
  baseline:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Install dependencies
        run: npm install
      - name: Run baseline-check
        run: npx baseline-check
`;
  
  fs.writeFileSync(workflowPath, workflowContent);
  console.log('✅ Created .github/workflows/baseline.yml');
}

console.log('\n🎯 Setup complete!');
console.log('\nNext steps:');
console.log('1. Run: baseline-check');
console.log('2. Edit baseline.config.json to set your target year');
console.log('3. Add to CI/CD with the generated GitHub Actions workflow');
console.log('\nFor help: baseline-check --help');