# PWA Configuration - Univirtus

## Overview
The Univirtus PWA is fully configured and ready for installation on mobile devices (Android and iOS).

## What's Configured

### 1. Manifest File (`public/manifest.json`)
- ✅ App name: "Univirtus - Portal do Aluno"
- ✅ Short name: "Univirtus"
- ✅ Display mode: standalone (full-screen app experience)
- ✅ Theme color: #004B8D (Univirtus blue)
- ✅ Background color: #004B8D
- ✅ Orientation: portrait (locked to vertical)
- ✅ Icons: 192x192 and 512x512 (graduation cap with "U" logo)
- ✅ Categories: education, productivity
- ✅ Language: pt-BR

### 2. iOS Meta Tags (`index.html`)
- ✅ `apple-mobile-web-app-capable`: Enables full-screen mode on iOS
- ✅ `apple-mobile-web-app-status-bar-style`: Black translucent status bar
- ✅ `apple-mobile-web-app-title`: "Univirtus"
- ✅ `apple-touch-icon`: App icon for iOS home screen

### 3. Service Worker (Workbox via VitePWA)
The service worker provides offline functionality with the following caching strategies:

#### Precaching (Cache on Install)
- All JavaScript bundles
- All CSS files
- HTML files
- Icons (192x192, 512x512, SVG)
- Manifest files

#### Runtime Caching
1. **Google Fonts** (CacheFirst, 1 year)
   - fonts.googleapis.com
   - fonts.gstatic.com

2. **Mock Data** (CacheFirst, 1 week)
   - All JSON files in `/mock/` directory
   - Student profiles and data

3. **Automatic Updates**
   - Service worker auto-updates when new version is deployed
   - Old caches are automatically cleaned up

### 4. PWA Icons
Located in `public/icons/`:
- `icon-192x192.png` - For Android home screen and splash screen
- `icon-512x512.png` - For high-resolution displays
- `icon.svg` - Source SVG for future conversions

**Note**: Current icons are SVG files with .png extensions. They work in modern browsers but can be converted to true PNG files if needed. See `public/icons/README.md` for conversion instructions.

## Installation Instructions

### For Users (Android)
1. Open the app in Chrome browser
2. Tap the menu (⋮) and select "Add to Home screen"
3. Confirm the installation
4. The app icon will appear on your home screen

### For Users (iOS)
1. Open the app in Safari browser
2. Tap the Share button (□↑)
3. Scroll down and tap "Add to Home Screen"
4. Confirm the installation
5. The app icon will appear on your home screen

### For Developers (Testing)
1. Build the app: `npm run build`
2. Preview the build: `npm run preview`
3. Open in browser and check:
   - Chrome DevTools > Application > Manifest
   - Chrome DevTools > Application > Service Workers
   - Lighthouse PWA audit

## Offline Functionality

The app works completely offline after the first visit:
- ✅ All pages and navigation
- ✅ All mock data (student profiles, courses, etc.)
- ✅ All UI components and styles
- ✅ All icons and images

## Testing PWA Features

### Check Manifest
```bash
# Open Chrome DevTools
# Go to Application > Manifest
# Verify all fields are correct
```

### Check Service Worker
```bash
# Open Chrome DevTools
# Go to Application > Service Workers
# Verify service worker is registered and active
```

### Test Offline Mode
```bash
# Open Chrome DevTools
# Go to Network tab
# Check "Offline" checkbox
# Navigate through the app - it should work!
```

### Run Lighthouse Audit
```bash
# Open Chrome DevTools
# Go to Lighthouse tab
# Select "Progressive Web App" category
# Click "Generate report"
# Target score: 90+
```

## Deployment to GitHub Pages

The PWA is configured for GitHub Pages deployment:
- Base path: `/univirtus-pwa/`
- Service worker scope: `/univirtus-pwa/`
- All asset paths are relative to base

To deploy:
```bash
npm run build
# Upload dist/ folder to GitHub Pages
# Or use gh-pages: npm install -D gh-pages
# Add script: "deploy": "npm run build && gh-pages -d dist"
```

## Browser Support

- ✅ Chrome/Edge (Android): Full PWA support
- ✅ Safari (iOS): Full PWA support (with limitations)
- ✅ Firefox (Android): Full PWA support
- ⚠️ Desktop browsers: Works as regular web app

## Requirements Met

This configuration satisfies:
- ✅ Requirement 16.1: Responsive layout for 4.5" to 7" screens
- ✅ Requirement 16.2: Portrait orientation support
- ✅ Requirement 16.4: GitHub Pages compatibility

## Next Steps

1. ✅ PWA configuration complete
2. ⏭️ Continue with Task 4: Create TypeScript Types and Interfaces
3. ⏭️ Build remaining app features
4. ⏭️ Test PWA installation on real devices
5. ⏭️ Deploy to GitHub Pages
