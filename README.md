# 🛡️ baseline-check

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)

A comprehensive solution for preventing unsafe modern web features from breaking your deployments. Includes both a powerful CLI tool and an interactive web playground.

## 🌟 Project Overview

**baseline-check** helps developers maintain browser compatibility by checking JavaScript, CSS, and HTML code against [Baseline](https://web.dev/baseline/) web standards. It ensures your features are supported across browsers for your target year.

## 🚀 Quick Start

### For Users

1. **Install the CLI globally:**
   ```bash
   npm install -g baseline-check
   ```

2. **Try the web playground:**
   Visit: [https://baseline-check.netlify.app/playground](https://baseline-check.netlify.app/playground)

### For Developers

1. **Clone and setup:**
   ```bash
   git clone https://github.com/your-username/baseline-check.git
   cd baseline-check
   npm run install:all
   ```

2. **Start development:**
   ```bash
   npm run dev:site    # Start website
   npm run start:cli   # Test CLI
   ```

## 📦 Project Components

### 🔧 CLI Tool (`/cli`)
- Scans JS, TS, CSS, HTML files for modern features
- Generates detailed compatibility reports
- Integrates with CI/CD pipelines
- Configurable Baseline years (2021-2024+)

### 🌐 Website (`/site`)
- Modern Next.js website with glass-morphism design
- Interactive code playground with real-time analysis
- Comprehensive documentation
- Mobile-responsive layout

## 🎯 Key Features

- ✅ **Multi-language Support** - JavaScript, TypeScript, CSS, HTML
- ✅ **Baseline Standards** - Uses official web-features dataset
- ✅ **CI/CD Integration** - GitHub Actions, Jenkins, etc.
- ✅ **Interactive Playground** - Test code snippets online
- ✅ **Modern UI Design** - Beautiful, responsive interface
- ✅ **Detailed Reports** - Comprehensive analysis output

## 🚀 Deployment Ready

### Website (Netlify)
```bash
cd site
npm run build
netlify deploy --prod --dir .next
```

### CLI Package (npm)
```bash
cd cli
npm login
npm publish
```

## 📊 Usage Examples

```bash
# Basic check
baseline-check

# Generate report
baseline-check --report

# Custom baseline year
baseline-check --baseline 2022
```

## 🔗 Links

- 🌐 **Website**: [https://baseline-check.netlify.app](https://baseline-check.netlify.app)
- 🎮 **Playground**: [https://baseline-check.netlify.app/playground](https://baseline-check.netlify.app/playground)
- 📦 **npm Package**: [https://www.npmjs.com/package/baseline-check](https://www.npmjs.com/package/baseline-check)
- 🚀 **Deployment Guide**: [DEPLOYMENT.md](DEPLOYMENT.md)

## 📄 License

MIT License - see [LICENSE](cli/LICENSE) for details.

---

**Made with ❤️ for safer web deployments**