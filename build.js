const fsStandard = require('fs');
const path = require('path');

async function build() {
    const root = __dirname;
    const dist = path.join(root, 'dist');

    // 1. Clean/Create dist
    if (fsStandard.existsSync(dist)) {
        fsStandard.rmSync(dist, { recursive: true, force: true });
    }
    fsStandard.mkdirSync(dist);

    // 2. Clone project structure to dist
    const foldersToCopy = ['pages', 'public', 'src'];
    const filesToCopy = ['vercel.json', 'manifest.json', 'README.md'];

    foldersToCopy.forEach(folder => {
        copyRecursiveSync(path.join(root, folder), path.join(dist, folder));
    });

    filesToCopy.forEach(file => {
        if (fsStandard.existsSync(path.join(root, file))) {
            fsStandard.copyFileSync(path.join(root, file), path.join(dist, file));
        }
    });

    // 3. Inject environment variables into the DIST version of config.js
    const configPath = path.join(dist, 'src/js/config.js');
    if (fsStandard.existsSync(configPath)) {
        let config = fsStandard.readFileSync(configPath, 'utf8');

        const neonAuthUrl = process.env.NEON_AUTH_URL || 'YOUR_NEON_AUTH_URL';
        const neonApiUrl = process.env.NEON_API_URL || 'YOUR_NEON_API_URL';

        config = config.replace(/YOUR_NEON_AUTH_URL/g, neonAuthUrl);
        config = config.replace(/YOUR_NEON_API_URL/g, neonApiUrl);

        fsStandard.writeFileSync(configPath, config);
        console.log('Build: Neon variables injected into dist/src/js/config.js');
    }

    console.log('Build: Project bundled into /dist');
}

function copyRecursiveSync(src, dest) {
    const exists = fsStandard.existsSync(src);
    const stats = exists && fsStandard.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
        fsStandard.mkdirSync(dest);
        fsStandard.readdirSync(src).forEach((childItemName) => {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        fsStandard.copyFileSync(src, dest);
    }
}

build().catch(err => {
    console.error(err);
    process.exit(1);
});
