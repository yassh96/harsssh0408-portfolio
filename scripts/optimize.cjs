const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function processFile(filePath, maxWidth = 1600) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;

  const originalSize = fs.statSync(filePath).size;
  const webpPath = filePath.substring(0, filePath.lastIndexOf('.')) + '.webp';

  try {
    const metadata = await sharp(filePath).metadata();
    let pipeline = sharp(filePath);

    if (metadata.width && metadata.width > maxWidth) {
      pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
    }

    await pipeline
      .webp({ quality: 84, effort: 6 })
      .toFile(webpPath);

    const newSize = fs.statSync(webpPath).size;
    console.log(`Optimized ${path.basename(filePath)}: ${(originalSize / 1024 / 1024).toFixed(2)}MB -> ${(newSize / 1024 / 1024).toFixed(2)}MB`);
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err);
  }
}

async function run() {
  const galleryDir = path.resolve(__dirname, '../src/assets/gallery');
  const files = fs.readdirSync(galleryDir);
  for (const file of files) {
    const fullPath = path.join(galleryDir, file);
    if (fs.statSync(fullPath).isFile() && !file.endsWith('.webp')) {
      await processFile(fullPath, 1600);
    }
  }

  // Also process profile image
  const profilePath = path.resolve(__dirname, '../src/assets/harsh-profile-new.jpg');
  if (fs.existsSync(profilePath)) {
    await processFile(profilePath, 1200);
  }
}

run();
