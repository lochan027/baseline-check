# Distribution Guide

## 📦 Making baseline-check Installable

Here's everything you need to distribute baseline-check to other developers:

### 1. Publish to npm (Recommended)

```bash
# From the project root
cd cli
npm login
npm publish
```

After publishing, anyone can install with:
```bash
npm install -g baseline-check
```

### 2. GitHub Releases

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial release"
   git remote add origin https://github.com/yourusername/baseline-check.git
   git push -u origin main
   ```

2. **Create Release Package**:
   ```bash
   # Windows
   build.bat
   
   # macOS/Linux
   chmod +x build.sh
   ./build.sh
   ```

3. **Upload to GitHub Releases** with the generated `.tgz` file

### 3. Direct Installation from GitHub

Users can install directly:
```bash
npm install -g https://github.com/yourusername/baseline-check.git
```

### 4. Package for Different Platforms

#### npm Package
```bash
cd cli
npm pack
# Creates: baseline-check-1.0.0.tgz
```

#### Homebrew (macOS)
Create a formula in homebrew-core or your own tap.

#### Chocolatey (Windows)
Create a `.nuspec` file for Windows package manager.

#### Snap (Linux)
Create a `snapcraft.yaml` for Linux distributions.

### 5. Docker Container

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY cli/ .
RUN npm install -g .
ENTRYPOINT ["baseline-check"]
```

Build and push:
```bash
docker build -t baseline-check .
docker tag baseline-check yourusername/baseline-check
docker push yourusername/baseline-check
```

Users can run:
```bash
docker run -v $(pwd):/workspace -w /workspace yourusername/baseline-check
```

## 📋 Pre-publish Checklist

- [ ] Update version in `cli/package.json`
- [ ] Test CLI locally: `cd cli && npm start`
- [ ] Test installation: `npm pack && npm install -g baseline-check-1.0.0.tgz`
- [ ] Update README with installation instructions
- [ ] Create GitHub repository
- [ ] Add license file
- [ ] Test on different operating systems
- [ ] Create release notes

## 🚀 Publishing Commands

```bash
# Test package
cd cli
npm pack
npm install -g baseline-check-1.0.0.tgz
baseline-check --help

# Publish to npm
npm login
npm publish

# Clean up
npm uninstall -g baseline-check
```

## 🌐 Website Deployment

Deploy the playground to:

### Vercel
```bash
cd site
npx vercel --prod
```

### Netlify
```bash
cd site
npm run build
# Upload .next/ folder to Netlify
```

### GitHub Pages
Build static site and deploy to gh-pages branch.

## 📊 Usage Analytics

Consider adding telemetry to understand usage:
- Feature detection frequency
- Baseline year distribution
- Error patterns
- Performance metrics

Use services like:
- Google Analytics
- Mixpanel
- Custom analytics server