# Building St Michael LLC Dashboard for Windows

This guide explains how to build the Federal Opportunities Dashboard as a Windows desktop application.

## Prerequisites

- Windows 10/11 or Windows Server
- Node.js 18+ installed
- Git (optional)

## Build Steps

### 1. Prepare the Build Environment

```bash
# Copy package-electron.json to package.json
copy package-electron.json package.json

# Install dependencies
npm install
```

### 2. Build the Windows Application

```bash
# Build Windows installer (.exe)
npm run build-win

# Or build portable version
npm run build-win-portable
```

### 3. Output Files

The built applications will be in the `dist` folder:

- **Installer**: `St Michael LLC Dashboard Setup 1.0.0.exe`
- **Portable**: `StMichaelDashboard-Portable.exe`

## Application Features

The Windows desktop app includes:

- ✅ Native Windows application
- ✅ Desktop shortcuts
- ✅ Start menu integration  
- ✅ Full dashboard functionality
- ✅ AI chat assistant
- ✅ Offline capability (after initial setup)
- ✅ Auto-updater ready (if configured)

## Requirements for Running

- Windows 10/11 (64-bit)
- Internet connection for AI chat features
- OpenAI API key (configured in the app)

## Deployment

### Installer Version
- Installs to Program Files
- Creates desktop and start menu shortcuts
- Can be uninstalled via Control Panel

### Portable Version  
- Single executable file
- No installation required
- Can run from USB drive
- Stores settings in app folder

## Troubleshooting

### Build Issues
- Ensure Node.js 18+ is installed
- Run `npm install` before building
- Check Windows Defender isn't blocking the build

### Runtime Issues
- Verify OpenAI API key is set
- Check internet connection for AI features
- Run as administrator if needed

## Technical Details

- **Framework**: Electron
- **Backend**: Node.js + Express
- **Frontend**: Vanilla JavaScript + TailwindCSS
- **Build Tool**: electron-builder
- **Target**: Windows 64-bit

---

*Developed by Aliff Capital 2025*