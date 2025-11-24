const fs = require('fs');
const path = require('path');

// Target directory
const iconDir = path.join(__dirname, 'src/assets/icons');

// Ensure directory exists
if (!fs.existsSync(iconDir)){
    fs.mkdirSync(iconDir, { recursive: true });
    console.log('Created directory:', iconDir);
}

// A simple blue square PNG (Base64 encoded)
const base64Png = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPj/HwADBwL+MgXpZgAAAABJRU5ErkJggg==';
const buffer = Buffer.from(base64Png, 'base64');

// The sizes Chrome expects
const sizes = [16, 48, 128];

sizes.forEach(size => {
    const filePath = path.join(iconDir, `icon${size}.png`);
    fs.writeFileSync(filePath, buffer);
    console.log(`✅ Created: icon${size}.png`);
});

console.log('Icons generated successfully!');