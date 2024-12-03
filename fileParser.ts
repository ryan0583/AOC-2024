import fs from 'fs';
import path from 'path';

export const read = (directory: string, filename: string) => {
  const filePath = path.join(directory, filename);
  return fs.readFileSync(filePath, 'utf-8');
}

export const readLines = (directory: string, filename: string) => 
  read(directory, filename).split(/\r?\n/);
