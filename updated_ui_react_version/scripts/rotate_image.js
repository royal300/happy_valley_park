import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGE_PATH = path.join(__dirname, '../src/assets/Water Park/Multi Slide Water Ride (1).JPG');

async function rotateImage() {
    if (!fs.existsSync(IMAGE_PATH)) {
        console.error('❌ Image not found:', IMAGE_PATH);
        return;
    }

    try {
        console.log('🔄 Rotating image 180 degrees:', IMAGE_PATH);
        // Using rotate(180) to flip it upside down (which should make it upright if currently upside down)
        const buffer = await sharp(IMAGE_PATH)
            .rotate(180)
            .toBuffer();

        fs.writeFileSync(IMAGE_PATH, buffer);
        console.log('✅ Image rotated successfully!');
    } catch (error) {
        console.error('❌ Error rotating image:', error);
    }
}

rotateImage();
