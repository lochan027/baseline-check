# baseline-check

[![npm version](https://badge.fury.io/js/baseline-check.svg)](https://badge.fury.io/js/baseline-check)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

🛡️ **Prevent unsafe modern web features from breaking your deployments**

A powerful CLI tool that checks your JavaScript, CSS, and HTML code against [Baseline](https://web.dev/baseline/) web standards, ensuring your features are supported across browsers for your target year.

## 🌐 Live Demo

Try it out instantly: **[https://baseline-check.netlify.app/playground](https://baseline-check.netlify.app/playground)**

## ✨ Features

- 🔍 **Multi-language Support** - Scans JavaScript, TypeScript, CSS, and HTML files
- 📊 **Baseline Standards** - Uses official web-features dataset for accurate compatibility data  
- ⚡ **CI/CD Ready** - Integrates seamlessly with GitHub Actions, Jenkins, and other CI systems
- 🎯 **Configurable** - Set your target Baseline year (2021, 2022, 2023, 2024+)
- 📝 **Detailed Reports** - Generate comprehensive compatibility reports
- 🚀 **Fast & Lightweight** - Minimal dependencies, maximum performance

## 📦 Installation

### Global Installation (Recommended)

```bash
npm install -g baseline-check
```

### Project-specific Installation

```bash
npm install --save-dev baseline-check
```

### Quick Setup

```bash
# Install globally and create config
npm install -g baseline-check
baseline-setup

# Or use npx without installation
npx baseline-check --help
```

## 🚀 Quick Start

### 1. Create Configuration

Create a `baseline.config.json` file in your project root:

```json
{
  "baseline": "2023",
  "include": ["src/**/*.{js,ts,css,html}"],
  "exclude": ["node_modules/**", "dist/**"]
}
```

### 2. Run Check

```bash
# Check your code
baseline-check

# Generate detailed report
baseline-check --report

# Check specific files
baseline-check src/app.js styles/main.css
```

## 📋 Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `baseline` | string | `"2023"` | Target Baseline year (2021, 2022, 2023, 2024) |
| `include` | string[] | `["**/*.{js,ts,css,html}"]` | File patterns to include |
| `exclude` | string[] | `["node_modules/**"]` | File patterns to exclude |
| `strict` | boolean | `false` | Fail on any unsafe features |
| `report` | boolean | `false` | Generate detailed report file |

## 🔧 CLI Usage

```bash
# Basic usage
baseline-check

# With options
baseline-check --baseline 2022 --report --strict

# Check specific files
baseline-check src/app.js public/index.html

# Show help
baseline-check --help

# Show version
baseline-check --version
```

## 🔄 CI/CD Integration

### GitHub Actions

Create `.github/workflows/baseline-check.yml`:

```yaml
name: Baseline Compatibility Check

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
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Install dependencies
        run: npm install
      - name: Run baseline-check
        run: npx baseline-check --strict --report
```

## 📊 Example Output

```bash
$ baseline-check

🛡️  Baseline Check v1.0.0

📁 Scanning files...
   ✓ Found 15 files to check

🔍 Analyzing features...
   ✓ JavaScript: 8 files
   ✓ CSS: 4 files  
   ✓ HTML: 3 files

📋 Results for Baseline 2023:
   ✅ 12 safe features
   ❌ 2 unsafe features

⚠️  Unsafe Features Found:
   • CSS :has() selector (requires Baseline 2024)
   • Dialog element (requires Baseline 2024)

💡 Run with --report for detailed analysis
🚨 Use --strict to fail CI on unsafe features
```

## 🎮 Interactive Playground

Test your code instantly in our web playground:
**[https://baseline-check.netlify.app/playground](https://baseline-check.netlify.app/playground)**

## 🧪 Supported Features

### JavaScript/TypeScript
- Optional chaining (`?.`)
- Nullish coalescing (`??`)
- Private class fields (`#private`)
- Top-level await, Dynamic imports, BigInt
- And many more...

### CSS
- Container queries, `:has()` selector
- CSS Grid, Flexbox gap, Nesting
- Custom properties, Cascade layers
- And many more...

### HTML
- Dialog element, Details/Summary
- Custom elements, Web components
- And many more...

## 🔗 Links

- 🌐 **Website**: [https://baseline-check.netlify.app](https://baseline-check.netlify.app)
- 🎮 **Playground**: [https://baseline-check.netlify.app/playground](https://baseline-check.netlify.app/playground)
- 📦 **npm Package**: [https://www.npmjs.com/package/baseline-check](https://www.npmjs.com/package/baseline-check)

---

**Made with ❤️ for safer web deployments**