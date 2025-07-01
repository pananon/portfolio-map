@echo off
REM Harimangal Pandey Portfolio - Deployment Script (Windows)

echo 🚀 Starting deployment process...

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: package.json not found. Please run this script from the project root.
    pause
    exit /b 1
)

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

REM Build the project
echo 🔨 Building the project...
call npm run build

REM Check if build was successful
if not exist "dist" (
    echo ❌ Error: Build failed. dist folder not found.
    pause
    exit /b 1
)

echo ✅ Build completed successfully!
echo.
echo 📁 Build files are ready in the 'dist' folder
echo.
echo 🌐 Deployment Options:
echo 1. Netlify: Drag and drop the 'dist' folder to netlify.com
echo 2. Vercel: Run 'vercel' command
echo 3. GitHub Pages: Run 'npm run deploy'
echo.
echo 🎉 Ready for deployment!
pause 