const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Assets URLs from Figma
const assets = [
  {
    url: 'http://localhost:3845/assets/43162cce5f9ae8ddef76ba94778f8533271f2503.png',
    path: 'src/assets/background-model.png'
  },
  {
    url: 'http://localhost:3845/assets/999c35ec97dde9b9bab6b9a3afaeaef88ade5857.png',
    path: 'src/assets/elementos-03.png'
  },
  {
    url: 'http://localhost:3845/assets/277a212c71976bf0675247fbd3d88ea353374a03.png',
    path: 'src/assets/elementos-04.png'
  },
  {
    url: 'http://localhost:3845/assets/4c10a1e36ee8e53ace31da3662a944821b19bdd6.svg',
    path: 'src/assets/logo-vector.svg'
  },
  {
    url: 'http://localhost:3845/assets/cc9ccd42b44d1973ccc55b48dabf47dd56c0f488.svg',
    path: 'src/assets/in-play-text.svg'
  }
];

function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filepath}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      console.error(`Error downloading ${url}: ${err.message}`);
      reject(err);
    });
  });
}

async function downloadAllAssets() {
  for (const asset of assets) {
    try {
      await downloadFile(asset.url, asset.path);
    } catch (error) {
      console.error(`Failed to download ${asset.path}`);
    }
  }
  console.log('All assets download attempts completed');
}

downloadAllAssets();