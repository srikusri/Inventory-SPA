# 💻 Installation Instructions

## System Requirements

### Minimum Requirements
- **Operating System**: Windows 10+, macOS 10.14+, or Linux
- **Node.js**: Version 18.0 or higher
- **RAM**: 2GB minimum
- **Storage**: 500MB free space
- **Browser**: Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+

### Recommended
- **RAM**: 4GB or more
- **Storage**: 1GB free space
- **Camera**: For barcode scanning (optional)

## Step-by-Step Installation

### 1. Install Node.js

**If you don't have Node.js:**

#### Windows
1. Go to https://nodejs.org/
2. Download the LTS (Long Term Support) version
3. Run the installer
4. Follow the setup wizard
5. Verify installation:
   ```cmd
   node --version
   npm --version
   ```

#### macOS
```bash
# Using Homebrew (recommended)
brew install node

# Or download from https://nodejs.org/
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install nodejs npm
```

### 2. Download the Game

**Option A: Download ZIP**
1. Download the project as ZIP
2. Extract to your desired location
3. Open terminal/command prompt in that folder

**Option B: Using Git**
```bash
git clone <repository-url>
cd "Inventory SPA"
```

### 3. Install Dependencies

```bash
npm install
```

This will download all required packages. It may take 2-5 minutes.

**If you see errors:**
```bash
# Clear npm cache
npm cache clean --force

# Try again
npm install
```

### 4. Start the Game

```bash
npm start
```

You should see:
```
✔ Browser application bundle generation complete.
** Angular Live Development Server is listening on localhost:4200 **
```

### 5. Open in Browser

Navigate to: **http://localhost:4200**

The game should load automatically! 🎉

## Installing as a Progressive Web App (PWA)

### On Desktop (Chrome/Edge)

1. Open http://localhost:4200
2. Look for install icon in address bar (⊕ or 💾)
3. Click "Install"
4. The app opens in its own window!

### On Mobile (Android)

1. Open http://localhost:4200 in Chrome
2. Tap the menu (⋮)
3. Select "Add to Home screen"
4. Name it "Kids Store Manager"
5. Tap "Add"
6. Find the icon on your home screen!

### On Mobile (iOS/iPhone/iPad)

1. Open http://localhost:4200 in Safari
2. Tap the Share button (□ with arrow)
3. Scroll down and tap "Add to Home Screen"
4. Name it "Kids Store Manager"
5. Tap "Add"
6. Find the icon on your home screen!

## Troubleshooting

### Port 4200 Already in Use

```bash
# Use a different port
npm start -- --port 4300
```

Then open: http://localhost:4300

### Camera Permission Issues

**Chrome/Edge:**
1. Click the lock icon in address bar
2. Find "Camera" permission
3. Select "Allow"
4. Reload the page

**Safari:**
1. Safari menu → Settings → Websites
2. Find "Camera"
3. Set to "Allow"

### Installation Fails

**Error: "npm not found"**
- Node.js not installed correctly
- Restart terminal after installing Node.js
- Check PATH environment variable

**Error: "EACCES permission denied"**
```bash
# On macOS/Linux, don't use sudo with npm
# Fix npm permissions:
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

**Error: "Cannot find module"**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Issues

**Out of Memory**
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm start
```

**TypeScript Errors**
```bash
# Clear Angular cache
rm -rf .angular
npm start
```

## Building for Production

### Create Production Build

```bash
npm run build
```

Files will be in `dist/inventory-spa/`

### Build with PWA Support

```bash
npm run build:pwa
```

### Serve Production Build Locally

```bash
# Install serve globally
npm install -g serve

# Serve the build
serve -s dist/inventory-spa
```

## Network Access (Optional)

### Allow Other Devices to Connect

**For Testing on Phones/Tablets:**

```bash
# Find your computer's IP address

# Windows
ipconfig

# macOS/Linux
ifconfig
# or
ip addr show
```

Start with host option:
```bash
ng serve --host 0.0.0.0
```

Access from other devices:
```
http://YOUR_IP_ADDRESS:4200
```

**Example:** http://192.168.1.100:4200

## Deployment Options

### Deploy to Web

See `DEPLOYMENT.md` for complete instructions on:
- Netlify (easiest, free)
- Vercel (easy, free)
- GitHub Pages (free)
- Firebase Hosting (free tier)
- Self-hosting

### Local Network Deployment

Host on local network server (Raspberry Pi, NAS, etc.):

1. Build production version
2. Copy `dist/inventory-spa` to web server
3. Configure web server to serve files
4. Access from any device on network

## Updating

### Get Latest Version

```bash
# Pull latest changes
git pull

# Update dependencies
npm install

# Start
npm start
```

### Manual Update

1. Download new version
2. Extract to same location (overwrite)
3. Run `npm install`
4. Run `npm start`

## Uninstalling

### Remove from Computer

```bash
# Delete the project folder
rm -rf "Inventory SPA"
```

### Remove from Device

**Desktop:**
- Uninstall like any other app
- Or remove from Chrome: chrome://apps

**Mobile:**
- Long press icon
- Select "Remove" or "Uninstall"

## Performance Tips

### Faster Startup

```bash
# Use watch mode during development
npm run watch

# In another terminal
npm start
```

### Reduce Bundle Size

Edit `angular.json`:
```json
"optimization": true,
"buildOptimizer": true
```

### Clear Cache

```bash
# Clear Angular cache
rm -rf .angular

# Clear npm cache
npm cache clean --force
```

## Getting Help

### Check Logs

**Browser Console:**
- Press F12
- Click "Console" tab
- Look for errors (red text)

**Terminal:**
- Watch for error messages
- Note the error code

### Common Solutions

1. **Restart everything**
   - Close browser
   - Stop server (Ctrl+C)
   - Start again

2. **Clear and reinstall**
   ```bash
   rm -rf node_modules
   npm install
   ```

3. **Update Node.js**
   - Download latest LTS from nodejs.org
   - Reinstall

### Still Stuck?

Check these files:
- `QUICK_START.md` - Quick setup guide
- `README_KIDS_GAME.md` - Game features
- `PARENT_GUIDE.md` - Usage tips

## Advanced Configuration

### Environment Variables

Create `.env` file:
```
NODE_ENV=development
PORT=4200
```

### Custom Port

Edit `package.json`:
```json
"start": "ng serve --port 3000"
```

### Different Base URL

Edit `angular.json`:
```json
"baseHref": "/kids-store/"
```

## Security Notes

### HTTPS for Camera

Some browsers require HTTPS for camera access:

```bash
# Generate self-signed certificate
npm run start:https
```

Or use ngrok:
```bash
npm install -g ngrok
ngrok http 4200
```

---

**Installation complete! Ready to play! 🎮🏪✨**

For questions, see `PARENT_GUIDE.md` or `README_KIDS_GAME.md`

