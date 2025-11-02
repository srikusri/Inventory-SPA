# 🏪 Kids Store Manager - Learn & Play! 🎮

**🎉 NEW: This has been transformed into an educational kids game!**

A super fun, educational game where kids learn to manage their own store! With leveling up, achievements, coins, and colorful animations - learning has never been this fun!

> 📚 **Looking for the original business version?** Check the git history or see the technical documentation below.

## 🎮 Game Features

### Learn While Playing!
- 🌟 **Level Up System**: Start at level 1 and grow!
- 🪙 **Earn Coins**: Get rewards for everything you do
- 🏆 **8 Achievements**: Unlock as you play
- 🔥 **Daily Streaks**: Play every day for bonuses
- 🎨 **5 Store Themes**: Unlock with coins
- 🎵 **Fun Sound Effects**: Beeps, boops, and celebrations
- 📊 **Track Progress**: See your stats grow
- 💫 **Beautiful Animations**: Rainbow text, floating icons, pulses

### Add Items Mode (Learning Inventory) 📦
- 📷 **Scan Barcodes**: Use camera to scan real items
- ⌨️ **Type Codes**: Enter barcodes manually
- ✏️ **Edit Items**: Change name, price, quantity
- 🗑️ **Remove Items**: Manage your store
- ⭐ **Earn XP**: Get experience points!
- 🎯 **Unlock Achievements**: "Scanner Pro", "Inventory Expert"

### Sell Items Mode (Learning Sales) 💰
- 🛒 **Scan to Sell**: Add items to shopping cart
- 🔢 **Count Quantity**: How many to sell?
- ➕ **Math Practice**: Add up totals
- ✅ **Checkout**: Complete the sale
- 🪙 **Earn Coins**: Virtual currency rewards
- 📄 **Print Receipts**: See the sale summary

## 🚀 Quick Start

### Super Fast Setup (3 Minutes!)

1. **Install** the game:
```bash
npm install
```

2. **Start** playing:
```bash
npm start
```

3. **Open** your browser:
```
http://localhost:4200
```

4. **Play** and have fun! 🎉

> 📖 **First time?** Check out `QUICK_START.md` for a guided tutorial!

### 🌐 Deploy to GitHub Pages (2 Options)

**Option 1: Automatic (Recommended)**
```bash
git init
git add .
git commit -m "Kids Store Manager Game"
git remote add origin https://github.com/YOUR_USERNAME/Inventory-SPA.git
git push -u origin main
```
Then enable GitHub Pages in Settings → Pages → Source: GitHub Actions
Your game will auto-deploy on every push!

**Option 2: Manual Deploy**
```bash
npm run deploy
```

📘 **Full guide:** See `GITHUB_PAGES_DEPLOY.md`

### Install as an App (Works Offline!)

**On Phone/Tablet:**
1. Open in Safari or Chrome
2. Tap "Add to Home Screen"
3. It becomes a real app!

**On Computer:**
1. Look for install icon in browser
2. Click "Install"
3. Opens like a desktop app!

## 🎮 How to Play

### Mode 1: Add Items 📦

1. Click "📦 Add Items"
2. Click "📷 Scan Item" or "⌨️ Type Code"
3. Scan a barcode or type a number
4. Fill in item details (name, price, quantity)
5. Click "Add Item"
6. **🌟 You earn XP and points!**

### Mode 2: Sell Items 💰

1. Click "💰 Sell Items"
2. Scan items to add to cart
3. Adjust quantities if needed
4. Click "✅ Checkout"
5. Click "Complete Sale"
6. **🪙 You earn coins!**

### Check Your Progress 📊

- **Top Bar**: Level, coins, score, streak
- **Achievements**: Click 🏆 button
- **XP Bar**: Shows progress to next level

## 🎓 What Kids Learn

- ➕ **Math**: Addition, subtraction, multiplication
- 📖 **Reading**: Following instructions
- 🎯 **Problem Solving**: Inventory management
- 💼 **Life Skills**: Running a business
- 💻 **Technology**: Using apps and scanning

## 📚 Documentation

- **[Quick Start Guide](QUICK_START.md)** - Get playing in 3 minutes!
- **[Kids Game Guide](README_KIDS_GAME.md)** - Full game features
- **[Parent & Teacher Guide](PARENT_GUIDE.md)** - Educational value
- **[Customization](CUSTOMIZATION.md)** - Personalize the game
- **[Features List](FEATURES.md)** - Everything the game can do

## 🏗️ Architecture

### Components
- **AppComponent**: Main application shell with mode switching
- **InventoryManagementComponent**: Handles inventory operations
- **SalesComponent**: Manages point-of-sale functionality

### Services
- **StorageService**: Handles LocalStorage operations
- **InventoryService**: Manages inventory state and operations
- **CartService**: Manages shopping cart and sales

### Models
- **InventoryItem**: Item data structure
- **CartItem**: Cart item with quantity
- **Sale**: Completed sale record

## 🎨 Technologies

- **Angular 18+**: Modern framework with signals and standalone components
- **BMC UX Components**: Enterprise-grade UI components
- **ZXing**: Barcode/QR code scanning library
- **TypeScript**: Type-safe development
- **SCSS**: Advanced styling
- **LocalStorage API**: Client-side data persistence

## 🔧 Development

### Project Structure
```
src/
├── app/
│   ├── components/
│   │   ├── inventory-management/
│   │   └── sales/
│   ├── models/
│   │   └── inventory-item.model.ts
│   ├── services/
│   │   ├── storage.service.ts
│   │   ├── inventory.service.ts
│   │   └── cart.service.ts
│   ├── app.component.ts
│   └── app.component.html
├── main.ts
├── index.html
└── styles.scss
```

### Build for Production
```bash
npm run build
```

Production files will be in `dist/inventory-spa/`

## 📝 Best Practices

- Uses Angular signals for reactive state management
- Implements OnPush change detection for performance
- Follows Angular standalone components architecture
- Type-safe with strict TypeScript configuration
- Responsive design for mobile and desktop
- Modern, beautiful UI with smooth animations

## 🔒 Data Privacy

All data is stored locally in your browser's LocalStorage. No data is sent to external servers.

## 📄 License

MIT License - feel free to use this project for your needs!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## 📞 Support

For questions or support, please open an issue on the repository.

---

## 🌟 Perfect For

- **Ages 6-12**: Learning math and reading
- **Parents**: Educational screen time
- **Teachers**: Classroom activities  
- **Kids**: Fun and rewarding gameplay!

## 🔒 Safe & Private

✅ No ads  
✅ No in-app purchases  
✅ No data collection  
✅ Works offline  
✅ Kid-safe design  

## 🎯 Quick Tips

1. 🔥 Play daily for streak bonuses
2. 🏆 Check achievements often
3. 🪙 Save coins for themes
4. 📊 Watch your XP bar
5. 🎵 Turn on sound for more fun!
6. ⚙️ Use Settings to reset your store if needed

---

**Start your store manager adventure today! 🏪🎮✨**

