import { execSync } from 'child_process';
import fs from 'vite-plugin-fs/browser';
import path from 'path';
import { fileURLToPath } from 'url';

// Determine __dirname in an ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('Running predev script');

// Get the current Git commit hash
let commitHash;

try {
  commitHash = execSync('git rev-parse --short HEAD').toString().trim();
} catch (error) {
  console.error('Error fetching git commit hash', error);
  process.exit(1);
}

// Set the release version using the commit hash
const releaseVersion = `release-${commitHash}`;
console.log(`Computed release version: ${releaseVersion}`);
console.log(`__dirname: ${__dirname}`);

// Function to write to .env file
async function writeEnvFile() {
  const envFilePath = path.join(__dirname, '../.env');
  console.log(`Writing to .env file at path: ${envFilePath}`);

  let envConfig = {};

  try {
    if (
      await fs
        .access(envFilePath)
        .then(() => true)
        .catch(() => false)
    ) {
      const envContent = await fs.readFile(envFilePath, 'utf8');
      envContent.split('\n').forEach((line) => {
        const [key, value] = line.split('=');
        if (key) {
          envConfig[key] = value.replace(/"/g, ''); // Remove any existing quotes
        }
      });
    }
  } catch (error) {
    console.error('Error reading .env file', error);
    process.exit(1);
  }

  envConfig.SENTRY_RELEASE = releaseVersion;

  const newEnvContent = Object.entries(envConfig)
    .map(([key, value]) => `${key}="${value}"`) // Ensure values are quoted
    .join('\n');

  try {
    await fs.writeFile(envFilePath, newEnvContent, { flag: 'w' });
    console.log(`SENTRY_RELEASE set to ${releaseVersion}`);
  } catch (error) {
    console.error('Error writing to .env file', error);
    process.exit(1);
  }
}

// Call the async function
writeEnvFile();
