import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import ffprobeInstaller from '@ffprobe-installer/ffprobe';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set ffmpeg paths
ffmpeg.setFfmpegPath(ffmpegInstaller.path);
ffmpeg.setFfprobePath(ffprobeInstaller.path);

const HERO_VIDEO_PATH = path.join(__dirname, '../src/assets/videos/hvp_hero.mp4');

function optimizeHeroVideo() {
    return new Promise((resolve, reject) => {
        const initialSize = fs.statSync(HERO_VIDEO_PATH).size;
        const tempPath = HERO_VIDEO_PATH + '.temp.mp4';

        console.log(`🎬 Re-encoding hero video with better quality...`);
        console.log(`Current size: ${(initialSize / 1024 / 1024).toFixed(2)} MB`);

        ffmpeg(HERO_VIDEO_PATH)
            .outputOptions([
                '-c:v libx264',
                '-crf 23',  // Lower CRF = better quality (23 is good, 18 is near-lossless)
                '-preset medium',
                '-vf scale=-2:720',  // 720p resolution
                '-c:a aac',
                '-b:a 128k'
            ])
            .save(tempPath)
            .on('end', () => {
                const newSize = fs.statSync(tempPath).size;
                fs.renameSync(tempPath, HERO_VIDEO_PATH);
                console.log(`✅ Hero video re-encoded!`);
                console.log(`New size: ${(newSize / 1024 / 1024).toFixed(2)} MB`);
                console.log(`Quality: 720p at CRF 23 (high quality)`);
                resolve();
            })
            .on('error', (err) => {
                console.error(`❌ Error:`, err.message);
                if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
                reject(err);
            });
    });
}

optimizeHeroVideo();
