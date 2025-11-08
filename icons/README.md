# PWA Icons

## Current Status
The icon files (icon-192x192.png and icon-512x512.png) are currently SVG files with .png extensions. Modern browsers will render these correctly for PWA purposes.

## Converting to True PNG (Optional)

If you need true PNG files, you can convert the SVG files using one of these methods:

### Method 1: Using ImageMagick
```bash
convert icon.svg -resize 192x192 icon-192x192.png
convert icon.svg -resize 512x512 icon-512x512.png
```

### Method 2: Using Inkscape
```bash
inkscape icon.svg -w 192 -h 192 -o icon-192x192.png
inkscape icon.svg -w 512 -h 512 -o icon-512x512.png
```

### Method 3: Using Node.js (sharp)
```bash
npm install sharp
node -e "const sharp = require('sharp'); sharp('icon.svg').resize(192, 192).toFile('icon-192x192.png');"
node -e "const sharp = require('sharp'); sharp('icon.svg').resize(512, 512).toFile('icon-512x512.png');"
```

### Method 4: Online Tools
- Use https://cloudconvert.com/svg-to-png
- Use https://svgtopng.com/

## Design Guidelines
- The icon uses the Univirtus brand colors (#004B8D for background, #4D9FFF for accents)
- Features a graduation cap symbol representing education
- Includes the letter "U" for Univirtus branding
- Follows PWA icon best practices with proper padding and contrast
