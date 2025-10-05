@echo off
REM Build script for Windows

echo 🏗️  Building baseline-check for distribution...

REM Create distribution directory
if not exist "dist" mkdir dist

echo 📦 Packaging CLI tool...
cd cli
call npm pack
move *.tgz ..\dist\
cd ..

echo 🌐 Building website...
cd site
call npm run build
cd ..

echo ✅ Build complete!
echo 📦 CLI package created in dist/
echo 🌐 Website built in site/.next/

echo.
echo 🚀 To publish to npm:
echo   cd cli ^&^& npm publish
echo.
echo 🌐 To deploy website:
echo   cd site ^&^& npm run build ^&^& npm run start