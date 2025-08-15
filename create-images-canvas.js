const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Create directories
const dirs = ['assets', 'src/assets', 'src/assets/fonts'];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

function createImage(width, height, color, filename) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
  
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(filename, buffer);
}

// Create images
createImage(512, 512, '#9C00E2', 'assets/icon.png');
createImage(1284, 2778, '#9C00E2', 'assets/splash.png');
createImage(512, 512, '#9C00E2', 'assets/adaptive-icon.png');
createImage(48, 48, '#9C00E2', 'assets/favicon.png');

createImage(375, 812, '#F2E2DE', 'src/assets/background.jpg');
createImage(147, 40, '#FFFFFF', 'src/assets/logo.png');
createImage(170, 170, 'rgba(255,255,255,0.2)', 'src/assets/elementos-03.png');
createImage(202, 202, 'rgba(255,255,255,0.2)', 'src/assets/elementos-04.png');

console.log('Images created successfully!');