import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirsToScan = [
    path.join(__dirname, '../public'),
    path.join(__dirname, '../src/assets')
];

const ignoredFiles = [
    'hvp_banner.mp4' // Hero video
];

const imageExts = ['.jpg', '.jpeg', '.png', '.webp'];
const videoExts = ['.mp4'];

async function processFile(filePath) {
    const filename = path.basename(filePath);
    if (ignoredFiles.includes(filename)) {
        console.log(`Skipping ignored file: ${filename}`);
        return;
    }

    const stats = fs.statSync(filePath);
    const originalSizeMB = stats.size / (1024 * 1024);
    const ext = path.extname(filePath).toLowerCase();

    // Only process if larger than 100KB for images, or 500KB for videos
    if (imageExts.includes(ext) && stats.size > 100 * 1024) {
        console.log(`\nOptimizing Image: ${filename} (${originalSizeMB.toFixed(2)} MB)`);
        const tempPath = filePath + '.tmp' + ext;

        try {
            await sharp(filePath)
                .rotate() // preserve exif rotation
                .resize({ width: 1920, withoutEnlargement: true }) // max width 1920
                .jpeg({ quality: 70, force: false })
                .png({ quality: 70, force: false })
                .webp({ quality: 70, force: false })
                .toFile(tempPath);

            fs.renameSync(tempPath, filePath);
            const newStats = fs.statSync(filePath);
            const newSizeMB = newStats.size / (1024 * 1024);
            const reduction = ((originalSizeMB - newSizeMB) / originalSizeMB * 100).toFixed(1);
            console.log(`✅ Saved ${reduction}% -> New Size: ${newSizeMB.toFixed(2)} MB`);
        } catch (err) {
            console.error(`❌ Failed to process ${filename}:`, err.message);
            if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        }
    } else if (videoExts.includes(ext) && stats.size > 500 * 1024) {
        console.log(`\nOptimizing Video: ${filename} (${originalSizeMB.toFixed(2)} MB)`);
        const tempPath = filePath + '.tmp.mp4';

        try {
            // Re-encode with x264, resize to max 720p height, faststart for web
            execSync(`ffmpeg -y -i "${filePath}" -vcodec libx264 -crf 28 -preset fast -vf "scale=-2:'min(720,ih)'" -acodec aac -b:a 128k -movflags +faststart "${tempPath}"`, { stdio: 'ignore' });

            fs.renameSync(tempPath, filePath);
            const newStats = fs.statSync(filePath);
            const newSizeMB = newStats.size / (1024 * 1024);
            const reduction = ((originalSizeMB - newSizeMB) / originalSizeMB * 100).toFixed(1);
            console.log(`✅ Saved ${reduction}% -> New Size: ${newSizeMB.toFixed(2)} MB`);
        } catch (err) {
            console.error(`❌ Failed to process ${filename}:`, err.message);
            if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        }
    }
}

function scanDir(dir) {
    if (!fs.existsSync(dir)) return [];
    let processingPromises = [];

    const files = fs.readdirSync(dir);
    for (const file of files) {
        // Skip hidden files/folders and specific directories if needed
        if (file.startsWith('.')) continue;
        if (file === 'uploads') continue; // Skip live uploads folder from dev testing

        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            processingPromises.push(...scanDir(fullPath));
        } else {
            processingPromises.push(processFile(fullPath));
        }
    }
    return processingPromises;
}

async function main() {
    console.log("Starting Media Optimization...");
    let promises = [];
    dirsToScan.forEach(dir => {
        promises.push(...scanDir(dir));
    });

    await Promise.all(promises);
    console.log("Optimization Complete!");
}

main();
