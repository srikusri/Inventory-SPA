# 🚀 Deployment Cheat Sheet

Quick reference for deploying your game!

## 📋 Prerequisites

- [ ] GitHub account created
- [ ] Git installed (`git --version`)
- [ ] Node.js installed (`node --version`)
- [ ] Project built successfully (`npm run build:gh-pages`)

## ⚡ Quick Deploy Commands

### First Time Deploy

```bash
# 1. Initialize git
git init

# 2. Add all files
git add .

# 3. Commit
git commit -m "🎮 Initial commit - Kids Store Manager"

# 4. Create repository on GitHub (do this first at github.com)
# Name: Inventory-SPA

# 5. Add remote
git remote add origin https://github.com/YOUR_USERNAME/Inventory-SPA.git

# 6. Push
git branch -M main
git push -u origin main

# 7. Enable GitHub Pages
# Go to: Settings → Pages → Source: GitHub Actions

# 8. Wait 2-3 minutes
# Game will be live at: https://YOUR_USERNAME.github.io/Inventory-SPA/
```

### Update Deployed Game

```bash
# Make your changes, then:
git add .
git commit -m "Update: describe your changes"
git push

# GitHub Actions automatically deploys!
# Wait 2-3 minutes for changes to go live
```

### Manual Deploy (Alternative)

```bash
# One command deploy:
npm run deploy

# Game updates in ~1 minute
```

## 🔧 Build Commands

```bash
# Local development
npm start                    # Start dev server
npm run watch               # Build with watch mode

# Production builds
npm run build               # Standard production build
npm run build:gh-pages      # Build for GitHub Pages
npm run build:pwa           # Build with PWA support

# Deploy
npm run deploy              # Build and deploy to GitHub Pages
```

## 🌐 Your URLs

```bash
# Local development
http://localhost:4200

# GitHub Pages (after deploy)
https://YOUR_USERNAME.github.io/Inventory-SPA/

# Custom domain (if configured)
https://www.your-domain.com
```

## ⚙️ Configuration Files

| File | Purpose |
|------|---------|
| `.github/workflows/deploy.yml` | Auto-deploy on push |
| `package.json` | Build scripts |
| `angular.json` | Angular configuration |
| `.gitignore` | Files to ignore |

## 🐛 Quick Fixes

### 404 Error
```bash
# Rebuild with correct base href
npm run build:gh-pages
git add dist
git commit -m "Fix: rebuild for GitHub Pages"
git push
```

### Assets Not Loading
```bash
# Check base href in build
npm run build:gh-pages
# Verify dist/inventory-spa/index.html has correct base href
```

### Build Fails
```bash
# Clear caches
rm -rf node_modules .angular
npm install
npm run build:gh-pages
```

## 📊 Check Deployment Status

1. **GitHub Actions Tab**
   - See build progress
   - Check for errors
   - View deployment logs

2. **GitHub Pages Settings**
   - Settings → Pages
   - See deployment status
   - Get live URL

3. **Test Deployed Game**
   - Open URL in browser
   - Test on mobile
   - Check offline mode (PWA)

## 🎯 Deployment Checklist

Before deploying:
- [ ] Game works locally (`npm start`)
- [ ] Production build succeeds (`npm run build:gh-pages`)
- [ ] All features tested
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Camera works (HTTPS)

After deploying:
- [ ] Game loads at GitHub Pages URL
- [ ] All features work online
- [ ] PWA installs correctly
- [ ] Works offline after first load
- [ ] Mobile experience good

## 💡 Pro Tips

**Faster Deployments:**
```bash
# Use GitHub Actions for automatic deployment
# Push to main = auto deploy in 2-3 minutes
```

**Test Before Deploy:**
```bash
# Always test production build locally first
npm run build:gh-pages
npx serve -s dist/inventory-spa
# Open http://localhost:3000
```

**Version Your Releases:**
```bash
# Tag important versions
git tag v1.0.0
git push --tags

# Create GitHub Release for downloads
```

**Monitor Your Deploys:**
```bash
# Add badge to README.md
[![Deploy](https://github.com/USER/Inventory-SPA/actions/workflows/deploy.yml/badge.svg)](https://github.com/USER/Inventory-SPA/actions/workflows/deploy.yml)
```

## 🆘 Emergency Rollback

If something breaks:

```bash
# Option 1: Revert last commit
git revert HEAD
git push

# Option 2: Reset to previous version
git reset --hard COMMIT_HASH
git push --force  # Use with caution!

# Option 3: Deploy previous tag
git checkout v1.0.0
npm run deploy
git checkout main
```

## 📱 Share Your Game

Once deployed:

**Direct Link:**
```
https://YOUR_USERNAME.github.io/Inventory-SPA/
```

**Shortened URL:**
Use bit.ly or tinyurl.com

**QR Code:**
Generate at qr-code-generator.com

**Social:**
"Check out my kids learning game! 🎮
https://YOUR_USERNAME.github.io/Inventory-SPA/"

## 🎉 Success!

Your game is live! Now:
1. ✅ Share with friends & family
2. ✅ Post on social media
3. ✅ Get feedback from kids
4. ✅ Update and improve
5. ✅ Watch kids learn and have fun!

---

**Need detailed help?** See `GITHUB_PAGES_DEPLOY.md`

**Quick questions?** Check the troubleshooting section above

**Ready to share?** Your game is at: `https://YOUR_USERNAME.github.io/Inventory-SPA/`

