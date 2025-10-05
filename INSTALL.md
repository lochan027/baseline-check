# Installation Guide

## Option 1: Install from npm (Recommended)

Once published to npm, users can install globally:

```bash
npm install -g baseline-check
```

Then use anywhere:
```bash
cd your-project
baseline-check
```

## Option 2: Install from GitHub

```bash
# Clone the repository
git clone https://github.com/yourusername/baseline-check.git
cd baseline-check

# Install all dependencies
npm run setup

# Test the CLI
cd cli
npm start

# Test the playground
npm run dev:site
```

## Option 3: Use with npx (No installation)

```bash
npx baseline-check
```

## Quick Start

1. **Create configuration file** in your project root:
   ```json
   {
     "baseline": "2023"
   }
   ```
   Save as `baseline.config.json`

2. **Run the check**:
   ```bash
   baseline-check
   ```

3. **Generate report**:
   ```bash
   baseline-check --report
   ```

## System Requirements

- Node.js 16.0.0 or higher
- npm 7.0.0 or higher

## What Gets Installed

- `baseline-check` command-line tool
- Dependencies for feature detection
- Example configuration file

## Troubleshooting

### Command not found
```bash
# If globally installed but command not found
npm list -g baseline-check

# If using npx
npx baseline-check --help
```

### Permission issues on macOS/Linux
```bash
sudo npm install -g baseline-check
```

### Windows PowerShell execution policy
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```