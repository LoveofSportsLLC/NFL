import fs from 'vite-plugin-fs/browser';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const directoryPath = path.join(__dirname, '../src'); // Update with your components directory

const replaceImports = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const result = data
      .replace(
        /import (.*) from "\.\.\/\.\.\/assets\/img/g,
        'import $1 from "@img',
      )
      .replace(
        /import (.*) from "\.\.\/\.\.\/\.\.\/assets\/img/g,
        'import $1 from "@img',
      )
      .replace(
        /import (.*) from "\.\.\/\.\.\/\.\.\/\.\.\/assets\/img/g,
        'import $1 from "@img',
      );
    await fs.writeFile(filePath, result, 'utf8');
    console.log(`Updated imports in ${filePath}`);
  } catch (err) {
    console.error(`Error updating imports in ${filePath}: ${err}`);
  }
};

const readDirectory = async (directory) => {
  try {
    const files = await fs.readdir(directory);
    for (const file of files) {
      const filePath = path.join(directory, file);
      const stats = await fs.lstat(filePath);
      if (stats.isDirectory()) {
        await readDirectory(filePath);
      } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
        await replaceImports(filePath);
      }
    }
  } catch (err) {
    console.error(`Unable to scan directory: ${err}`);
  }
};

readDirectory(directoryPath);
