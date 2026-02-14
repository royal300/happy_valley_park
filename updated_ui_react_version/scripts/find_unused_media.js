import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.join(__dirname, '../src');
const ASSETS_DIR = path.join(SRC_DIR, 'assets');

// Extensions to look for
const MEDIA_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.mp4', '.webm', '.webp', '.avif'];
const CODE_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.html'];

function getFiles(dir, extensions) {
    let results = [];
    if (!fs.existsSync(dir)) return results;

    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFiles(file, extensions));
        } else {
            const ext = path.extname(file).toLowerCase();
            if (extensions.includes(ext)) {
                results.push(file);
            }
        }
    });
    return results;
}

function scanCodebase() {
    console.log('🔍 Scanning for unused media files...');

    const mediaFiles = getFiles(ASSETS_DIR, MEDIA_EXTENSIONS);
    const codeFiles = getFiles(SRC_DIR, CODE_EXTENSIONS).filter(f => !f.includes('/assets/'));

    console.log(`Found ${mediaFiles.length} media files.`);
    console.log(`Found ${codeFiles.length} code files.`);

    const unusedFiles = [];

    // Read all code content into memory and STRIP COMMENTS
    let allCodeContent = '';
    codeFiles.forEach(file => {
        let content = fs.readFileSync(file, 'utf8');
        // Remove single line comments
        content = content.replace(/\/\/.*$/gm, '');
        // Remove multi-line comments
        content = content.replace(/\/\*[\s\S]*?\*\//g, '');
        allCodeContent += content + '\n';
    });

    // Check index.html too
    try {
        const indexHtml = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
        allCodeContent += indexHtml;
    } catch (e) { }

    // Also scan public folder for media
    const PUBLIC_DIR = path.join(__dirname, '../public');
    const publicMedia = getFiles(PUBLIC_DIR, MEDIA_EXTENSIONS);

    // Scan public files usage
    publicMedia.forEach(mediaFile => {
        const filename = path.basename(mediaFile);
        if (!allCodeContent.includes(filename)) {
            unusedFiles.push(mediaFile);
        }
    });


    mediaFiles.forEach(mediaFile => {
        const filename = path.basename(mediaFile);
        // Basic check: is the filename present in the code?
        // This handles cases like import x from './assets/image.png'
        // It might have false positives (if filename is generic like "icon.png" appearing in comments), 
        // but for unused detection, we want to be safe (false negative is worse - identifying used file as unused).
        // False positive here means we say it's used when it's not. That's safer.

        if (!allCodeContent.includes(filename)) {
            unusedFiles.push(mediaFile);
        }
    });

    console.log(`\n❌ Found ${unusedFiles.length} unused files:`);
    unusedFiles.forEach(f => console.log(f));
}

scanCodebase();
