const fs = require('fs');
const path = require('path');

async function build() {
    const root = __dirname;
    const dist = path.join(root, 'dist');

    console.log('Build: Starting bundling process...');

    // 1. Clean/Create dist
    if (fs.existsSync(dist)) {
        fs.rmSync(dist, { recursive: true, force: true });
    }
    fs.mkdirSync(dist, { recursive: true });

    // 2. Clone project structure to dist
    const itemsToCopy = ['pages', 'public', 'src', 'vercel.json', 'manifest.json', 'README.md'];

    itemsToCopy.forEach(item => {
        const srcPath = path.join(root, item);
        const destPath = path.join(dist, item);

        if (fs.existsSync(srcPath)) {
            fs.cpSync(srcPath, destPath, { recursive: true, verbatim: true });
            console.log(`Build: Successfully copied ${item}`);
        } else {
            console.log(`Build: Warning - ${item} not found at root.`);
        }
    });

    // 3. Ensure public exists in dist even if empty
    const distPublic = path.join(dist, 'public');
    if (!fs.existsSync(distPublic)) {
        fs.mkdirSync(distPublic);
        console.log('Build: Created empty public directory in dist');
    }

    // 4. Inject environment variables into the DIST version of config.js
    const configPath = path.join(dist, 'src/js/config.js');
    if (fs.existsSync(configPath)) {
        let config = fs.readFileSync(configPath, 'utf8');

        const neonAuthUrl = process.env.NEON_AUTH_URL || 'YOUR_NEON_AUTH_URL';
        const neonApiUrl = process.env.NEON_API_URL || 'YOUR_NEON_API_URL';

        config = config.replace(/YOUR_NEON_AUTH_URL/g, neonAuthUrl);
        config = config.replace(/YOUR_NEON_API_URL/g, neonApiUrl);

        fs.writeFileSync(configPath, config);
        console.log('Build: Neon variables injected into /dist/src/js/config.js');
    }

    console.log('Build: Project successfully bundled into /dist folder.');
    console.log('IMPORTANT: Set Vercel "Output Directory" to "dist"');
}

build().catch(err => {
    console.error('Build Error:', err);
    process.exit(1);
});
