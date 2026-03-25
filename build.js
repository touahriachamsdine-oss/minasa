const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'src/js/config.js');
let config = fs.readFileSync(configPath, 'utf8');

// Inject environment variables if they exist in Vercel
const supabaseUrl = process.env.SUPABASE_URL || 'https://YOUR_PROJECT_ID.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'YOUR_ANON_KEY_HERE';

config = config.replace(/'https:\/\/YOUR_PROJECT_ID\.supabase\.co'/g, `'${supabaseUrl}'`);
config = config.replace(/'YOUR_ANON_KEY_HERE'/g, `'${supabaseKey}'`);

fs.writeFileSync(configPath, config);
console.log('Build: Environment variables injected into config.js');
