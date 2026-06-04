const ffmpeg = require('fluent-ffmpeg');
const ffmpegStatic = require('ffmpeg-static');
const path = require('path');
const fs = require('fs');

ffmpeg.setFfmpegPath(ffmpegStatic);

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.mp4'));

// Custom times based on page.tsx
const customTimes = {
  'capsule-0.mp4': 30,
  'capsule-1.mp4': 45,
  'capsule-2.mp4': 30
};

async function processFiles() {
  for (const file of files) {
    const time = customTimes[file] || 25;
    const inputFile = path.join(publicDir, file);
    const outputFile = path.join(publicDir, `thumb-${file.replace('.mp4', '.jpg')}`);
    
    console.log(`Processing ${file} at ${time}s...`);
    
    await new Promise((resolve, reject) => {
      ffmpeg(inputFile)
        .screenshots({
          timestamps: [time],
          filename: `thumb-${file.replace('.mp4', '.jpg')}`,
          folder: publicDir,
          size: '640x360'
        })
        .on('end', () => {
          console.log(`Saved ${outputFile}`);
          resolve();
        })
        .on('error', (err) => {
          console.error(`Error processing ${file}:`, err);
          resolve(); // Resolve anyway to continue with other files
        });
    });
  }
}

processFiles().then(() => console.log('Done!'));
