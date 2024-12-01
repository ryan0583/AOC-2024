import fs from 'fs';
import path from 'path';

export const readLines = (directory: string, filename: string) => {
  console.log(directory);
  const filePath = path.join(directory, filename);
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  return fileContents.split(/\r?\n/);
};
