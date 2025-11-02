# 🚀 Quick Setup Guide

This guide will help you get the Inventory Manager SPA up and running in minutes.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- A modern web browser (Chrome, Firefox, Safari, or Edge)

## Step-by-Step Setup

### 1. Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

This will install all required packages including:
- Angular framework
- BMC UX components
- ZXing barcode scanner
- Other dependencies

**Note**: The first installation might take a few minutes.

### 2. Start Development Server

Once installation is complete, start the development server:

```bash
npm start
```

Or alternatively:

```bash
ng serve
```

You should see output similar to:
```
✔ Browser application bundle generation complete.
Initial Chunk Files | Names         | Raw Size
main.js             | main          |   XXX kB
...

** Angular Live Development Server is listening on localhost:4200 **
```

### 3. Open in Browser

Open your web browser and navigate to:
```
http://localhost:4200
```

The application should load automatically! 🎉

### 4. Camera Permissions

When you first try to scan a barcode:
1. Your browser will request camera permission
2. Click **"Allow"** to enable scanning
3. If you accidentally denied permission, you can reset it in your browser settings

## Common Issues & Solutions

### Issue: Camera not working
**Solution**: 
- Make sure you allowed camera permissions
- Try using HTTPS (some browsers require it for camera access)
- Check if another application is using the camera

### Issue: npm install fails
**Solution**:
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` folder and try again
- Check your internet connection

### Issue: Port 4200 already in use
**Solution**:
- Use a different port: `ng serve --port 4300`
- Or kill the process using port 4200

## Project Structure Quick Reference

```
inventory-spa/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── inventory-management/  # Inventory mode
│   │   │   └── sales/                 # Sales mode
│   │   ├── services/                  # Business logic
│   │   └── models/                    # Data structures
│   ├── index.html                     # Main HTML
│   └── styles.scss                    # Global styles
├── package.json                       # Dependencies
└── angular.json                       # Angular config
```

## Next Steps

1. **Add your first item**:
   - Switch to Inventory mode
   - Click "Manual Entry"
   - Enter a barcode (e.g., "12345")
   - Fill in item details
   - Save!

2. **Make your first sale**:
   - Switch to Sales mode
   - Scan or manually enter the item
   - Click Checkout
   - Complete the sale!

3. **Explore features**:
   - Edit existing items
   - Adjust cart quantities
   - Print receipts
   - View inventory stats

## Development Commands

- `npm start` - Start dev server
- `npm run build` - Build for production
- `npm run watch` - Build with watch mode
- `ng generate component <name>` - Create new component

## Need Help?

- Check the main [README.md](README.md) for detailed documentation
- Review Angular docs: https://angular.io/docs
- Check BMC UX documentation (if available)

---

**Happy coding! 🎉**

