import dotenv from 'dotenv';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __dirname = fileURLToPath(new URL('.', import.meta.url));
const rootDir = resolve(__dirname, '..');

// Always load environment variables from .env.development
// This will override any existing environment variables with the same names
console.log('Loading environment from .env.development');
dotenv.config({ 
  path: resolve(rootDir, '.env.development'),
  override: true // Ensure .env.development values take precedence
});