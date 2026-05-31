const ffmpeg=require('ffmpeg-static');
const {execSync}=require('child_process');
console.log('Compressing 1...');
execSync('"' + ffmpeg + '" -y -i public/capsule-1.mp4 -vcodec libx264 -crf 30 -preset fast -acodec aac -b:a 96k public/capsule-1-c.mp4', { stdio: 'inherit' });
console.log('Compressing 2...');
execSync('"' + ffmpeg + '" -y -i public/capsule-2.mp4 -vcodec libx264 -crf 30 -preset fast -acodec aac -b:a 96k public/capsule-2-c.mp4', { stdio: 'inherit' });
