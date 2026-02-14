import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import ffprobeInstaller from '@ffprobe-installer/ffprobe';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set ffmpeg paths
ffmpeg.setFfmpegPath(ffmpegInstaller.path);
ffmpeg.setFfprobePath(ffprobeInstaller.path);

const ASSETS_DIR = path.join(__dirname, '../src/assets');
const MAX_IMAGE_WIDTH = 1024; // Reduced to 1024 for smaller files
const IMAGE_QUALITY = 65; // More aggressive compression
const VIDEO_CRF = 32; // Higher CRF = more compression
const VIDEO_HEIGHT = 480; // Lower resolution for web

// Helper to recursively get files
function getFiles(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFiles(file));
        } else {
            results.push(file);
        }
    });
    return results;
}

async function optimizeImage(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;

    const tempPath = filePath + '.temp' + ext;
    const initialSize = fs.statSync(filePath).size;

    // Skip small images (< 200KB)
    if (initialSize < 200 * 1024) return;

    try {
        console.log(`Processing image: ${path.basename(filePath)} (${(initialSize / 1024 / 1024).toFixed(2)} MB)`);

        const pipeline = sharp(filePath);
        const metadata = await pipeline.metadata();

        if (metadata.width > MAX_IMAGE_WIDTH) {
            pipeline.resize(MAX_IMAGE_WIDTH);
        }

        if (ext === '.png') {
            await pipeline.png({ quality: IMAGE_QUALITY, compressionLevel: 9 }).toFile(tempPath);
        } else {
            await pipeline.jpeg({ quality: IMAGE_QUALITY, mozjpeg: true }).toFile(tempPath);
        }

        const newSize = fs.statSync(tempPath).size;

        if (newSize < initialSize) {
            fs.renameSync(tempPath, filePath);
            console.log(`✅ Optimized: ${path.basename(filePath)} -> ${(newSize / 1024 / 1024).toFixed(2)} MB (Saved ${((initialSize - newSize) / 1024 / 1024).toFixed(2)} MB)`);
        } else {
            fs.unlinkSync(tempPath);
            console.log(`Skipped (no gain): ${path.basename(filePath)}`);
        }

    } catch (error) {
        console.error(`❌ Error processing ${path.basename(filePath)}:`, error.message);
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    }
}

function optimizeVideo(filePath) {
    return new Promise((resolve, reject) => {
        const ext = path.extname(filePath).toLowerCase();
        if (ext !== '.mp4') return resolve();

        const initialSize = fs.statSync(filePath).size;
        // Skip small videos (< 5MB)
        if (initialSize < 5 * 1024 * 1024) return resolve();

        const tempPath = filePath + '.temp.mp4';

        console.log(`Processing video: ${path.basename(filePath)} (${(initialSize / 1024 / 1024).toFixed(2)} MB)`);

        ffmpeg(filePath)
            .outputOptions([
                '-c:v libx264',
                `-crf ${VIDEO_CRF}`,
                '-preset slow',
                `-vf scale=-2:${VIDEO_HEIGHT}`,
                '-c:a aac',
                '-b:a 128k'
            ])
            .save(tempPath)
            .on('end', () => {
                const newSize = fs.statSync(tempPath).size;
                if (newSize < initialSize) {
                    fs.renameSync(tempPath, filePath);
                    console.log(`✅ Optimized: ${path.basename(filePath)} -> ${(newSize / 1024 / 1024).toFixed(2)} MB (Saved ${((initialSize - newSize) / 1024 / 1024).toFixed(2)} MB)`);
                } else {
                    fs.unlinkSync(tempPath);
                    console.log(`Skipped (no gain): ${path.basename(filePath)}`);
                }
                resolve();
            })
            .on('error', (err) => {
                console.error(`❌ Error processing ${path.basename(filePath)}:`, err.message);
                if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
                resolve();
            });
    });
}

async function main() {
    console.log("🚀 Starting Media Optimization...");
    const files = getFiles(ASSETS_DIR);

    // Process Images
    for (const file of files) {
        await optimizeImage(file);
    }

    // Process Videos
    for (const file of files) {
        await optimizeVideo(file);
    }

    console.log("🎉 All optimizations complete!");
}

main();
