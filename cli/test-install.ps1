# Test Installation Script

# Test the packaged CLI
Write-Host "🧪 Testing baseline-check installation..." -ForegroundColor Cyan

# Install from local package
Write-Host "📦 Installing from local package..." -ForegroundColor Yellow
npm install -g .\baseline-check-1.0.0.tgz

# Test if command works
Write-Host "🎯 Testing baseline-check command..." -ForegroundColor Yellow
baseline-check --help

# Test setup command
Write-Host "⚙️  Testing baseline-setup command..." -ForegroundColor Yellow
baseline-setup

# Test running on current directory
Write-Host "🔍 Testing baseline check on current directory..." -ForegroundColor Yellow
baseline-check

Write-Host "✅ Installation test complete!" -ForegroundColor Green
Write-Host ""
Write-Host "To uninstall:" -ForegroundColor Gray
Write-Host "npm uninstall -g baseline-check" -ForegroundColor Gray