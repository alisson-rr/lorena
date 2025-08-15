const https = require('https');
const fs = require('fs');
const path = require('path');

const fonts = [
  {
    url: 'https://github.com/google/fonts/raw/main/ofl/anton/Anton-Regular.ttf',
    path: 'src/assets/fonts/Anton-Regular.ttf'
  },
  {
    url: 'https://github.com/google/fonts/raw/main/ofl/almarai/Almarai-Regular.ttf',
    path: 'src/assets/fonts/Almarai-Regular.ttf'
  },
  {
    url: 'https://github.com/google/fonts/raw/main/ofl/almarai/Almarai-Bold.ttf',
    path: 'src/assets/fonts/Almarai-Bold.ttf'
  }
];

function downloadFont(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      // Handle redirect
      if (response.statusCode === 302 || response.statusCode === 301) {
        https.get(response.headers.location, (redirectResponse) => {
          redirectResponse.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log(`Downloaded: ${filepath}`);
            resolve();
          });
        }).on('error', reject);
      } else {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Downloaded: ${filepath}`);
          resolve();
        });
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      console.error(`Error downloading ${url}: ${err.message}`);
      reject(err);
    });
  });
}

async function downloadAllFonts() {
  // Ensure fonts directory exists
  const fontsDir = 'src/assets/fonts';
  if (!fs.existsSync(fontsDir)) {
    fs.mkdirSync(fontsDir, { recursive: true });
  }

  for (const font of fonts) {
    try {
      await downloadFont(font.url, font.path);
    } catch (error) {
      console.error(`Failed to download ${font.path}: ${error.message}`);
    }
  }
  console.log('Font download process completed');
}

downloadAllFonts();