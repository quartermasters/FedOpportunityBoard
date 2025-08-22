const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Building St Michael LLC Dashboard for Windows...');

// Create package.json for build if it doesn't exist
const buildPackageJson = {
  "name": "st-michael-dashboard",
  "version": "1.0.0",
  "main": "main.js",
  "homepage": "./",
  "scripts": {
    "start": "node server.js",
    "electron": "electron .",
    "build-win": "electron-builder --win",
    "build-win-portable": "electron-builder --win portable",
    "dist": "electron-builder"
  },
  "build": {
    "appId": "com.aliffcapital.stmichael.dashboard",
    "productName": "St Michael LLC Dashboard",
    "directories": {
      "output": "dist"
    },
    "files": [
      "**/*",
      "!node_modules/@electron/",
      "!dist/",
      "!docs/",
      "!*.md"
    ],
    "win": {
      "target": [
        {
          "target": "nsis",
          "arch": ["x64"]
        },
        {
          "target": "portable", 
          "arch": ["x64"]
        }
      ],
      "publisherName": "Aliff Capital",
      "verifyUpdateCodeSignature": false
    },
    "nsis": {
      "oneClick": false,
      "perMachine": true,
      "allowToChangeInstallationDirectory": true,
      "createDesktopShortcut": true,
      "createStartMenuShortcut": true,
      "shortcutName": "St Michael LLC Dashboard"
    },
    "portable": {
      "artifactName": "StMichaelDashboard-Portable.exe"
    }
  },
  "keywords": ["federal", "contracting", "dashboard", "government"],
  "author": "Aliff Capital",
  "license": "ISC",
  "description": "St Michael LLC Federal Opportunities Dashboard - A comprehensive federal subcontracting market analysis tool"
};

try {
  // Check if we're on Windows or have wine for cross-compilation
  console.log('Checking build environment...');
  
  // Install electron-builder if not present
  try {
    require('electron-builder');
  } catch (e) {
    console.log('Installing electron-builder...');
    execSync('npm install electron-builder', { stdio: 'inherit' });
  }

  // Build for Windows
  console.log('Building Windows application...');
  console.log('Note: For best results, run this on a Windows machine or CI/CD pipeline');
  
  // Create temporary package.json for build
  fs.writeFileSync('package-build.json', JSON.stringify(buildPackageJson, null, 2));
  
  console.log('Build configuration created.');
  console.log('To build the Windows app, run:');
  console.log('npm run build-win');
  console.log('');
  console.log('Output will be in the "dist" folder');
  
} catch (error) {
  console.error('Build failed:', error.message);
  console.log('');
  console.log('To build manually on Windows:');
  console.log('1. Install Node.js and npm');
  console.log('2. Run: npm install');
  console.log('3. Run: npm run build-win');
}