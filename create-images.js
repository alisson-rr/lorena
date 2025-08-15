const fs = require('fs');
const path = require('path');

// Create a simple PNG file
function createPNG(width, height, color) {
  // PNG signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  
  // IHDR chunk
  const ihdr = Buffer.concat([
    Buffer.from('IHDR'),
    Buffer.from([
      (width >> 24) & 0xff, (width >> 16) & 0xff, (width >> 8) & 0xff, width & 0xff,
      (height >> 24) & 0xff, (height >> 16) & 0xff, (height >> 8) & 0xff, height & 0xff,
      8, 2, 0, 0, 0
    ])
  ]);
  
  // Create simple image data (solid color)
  const imageData = [];
  for (let y = 0; y < height; y++) {
    imageData.push(0); // filter type
    for (let x = 0; x < width; x++) {
      imageData.push(color[0], color[1], color[2]); // RGB
    }
  }
  
  // IDAT chunk with uncompressed data
  const zlib = require('zlib');
  const compressed = zlib.deflateSync(Buffer.from(imageData));
  
  // CRC calculation
  function crc32(data) {
    let crc = 0xffffffff;
    for (let i = 0; i < data.length; i++) {
      crc = crc ^ data[i];
      for (let j = 0; j < 8; j++) {
        if ((crc & 1) !== 0) {
          crc = (crc >>> 1) ^ 0xedb88320;
        } else {
          crc = crc >>> 1;
        }
      }
    }
    return crc ^ 0xffffffff;
  }
  
  function createChunk(type, data) {
    const length = Buffer.alloc(4);
    length.writeUInt32BE(data.length);
    const typeAndData = Buffer.concat([Buffer.from(type), data]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(typeAndData));
    return Buffer.concat([length, typeAndData, crc]);
  }
  
  // Build PNG
  const ihdrChunk = createChunk('IHDR', ihdr.slice(4));
  const idatChunk = createChunk('IDAT', compressed);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));
  
  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Create directories
const dirs = ['assets', 'src/assets', 'src/assets/fonts'];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Create images
const purple = [156, 0, 226];
const cream = [242, 226, 222];
const white = [255, 255, 255];
const green = [90, 242, 180];

// App icons
fs.writeFileSync('assets/icon.png', createPNG(512, 512, purple));
fs.writeFileSync('assets/splash.png', createPNG(1284, 2778, purple));
fs.writeFileSync('assets/adaptive-icon.png', createPNG(512, 512, purple));
fs.writeFileSync('assets/favicon.png', createPNG(48, 48, purple));

// Background and other assets
fs.writeFileSync('src/assets/background.jpg', createPNG(375, 812, cream));
fs.writeFileSync('src/assets/logo.png', createPNG(147, 40, white));
fs.writeFileSync('src/assets/elementos-03.png', createPNG(170, 170, white));
fs.writeFileSync('src/assets/elementos-04.png', createPNG(202, 202, white));

console.log('Images created successfully!');