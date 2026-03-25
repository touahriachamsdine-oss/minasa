const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'src/js/config.js');
let config = fs.readFileSync(configPath, 'utf8');

// Inject environment variables if they exist in Vercel
const neonAuthUrl = process.env.NEON_AUTH_URL || 'YOUR_NEON_AUTH_URL';
const neonApiUrl = process.env.NEON_API_URL || 'YOUR_NEON_API_URL';

config = config.replace(/YOUR_NEON_AUTH_URL/g, neonAuthUrl);
config = config.replace(/YOUR_NEON_API_URL/g, neonApiUrl);

fs.writeFileSync(configPath, config);
console.log('Build: Neon variables injected into config.js');
