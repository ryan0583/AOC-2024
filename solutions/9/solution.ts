import path from 'path';
import { readLines } from '../../fileParser';
import { log } from 'console';
import { sum } from '../../arrays';

const lines = readLines(path.resolve(), 'solutions/9/input.txt');

const filesAndSpaces = lines[0].split('').flatMap((c, index) => {
  const charToAppend = index % 2 === 0 ? `${index / 2}` : '.';
  const arr = [] as string[];
  for (let i = 0; i < parseInt(c); i++) {
    arr.push(charToAppend);
  }
  return arr;
});

// const originalLength = filesAndSpaces.filter(c => c === '.').length;
// for (let i=0; i<originalLength; i++) {
//     const char = filesAndSpaces.pop() as string;
//     if (char !== '.') {
//         const dotIndex = filesAndSpaces.indexOf('.');
//         filesAndSpaces[dotIndex] = char;
//     }
// }

// log(sum(filesAndSpaces.map((c, index) => Number(c) * index)));

// log(filesAndSpaces.join(''));
let fileId = Math.max(
  ...filesAndSpaces.filter((c) => c !== '.').map((c) => parseInt(c))
);
// log(fileId);

while (fileId >= 0) {
  log(fileId);
  const char = `${fileId}`;
  const blocksToMove = [] as string[];
  let nextChar = char;
  const lastFileIdIndex = filesAndSpaces.lastIndexOf(char);
  let nextCharIndex = lastFileIdIndex;
  while (nextChar === char) {
    blocksToMove.push(nextChar);
    nextCharIndex--;
    nextChar = filesAndSpaces[nextCharIndex];
  }
  const fileLength = blocksToMove.length;
  const emptyBlockArr = new Array(fileLength).fill('.');
  const emptyBlock = emptyBlockArr.join('');
  const filesAndSpacesStr = filesAndSpaces.join('');
  const emptyBlockIndex = filesAndSpacesStr.indexOf(emptyBlock);
  if (emptyBlockIndex >= 0 && emptyBlockIndex < lastFileIdIndex) {
    filesAndSpaces.splice(
      lastFileIdIndex - fileLength + 1,
      fileLength,
      ...emptyBlockArr
    );
    filesAndSpaces.splice(emptyBlockIndex, fileLength, ...blocksToMove);
  }
  //   log(filesAndSpaces.join(''));
  fileId--;
}

log(sum(filesAndSpaces.map((c, index) => (c !== '.' ? Number(c) * index : 0))));
