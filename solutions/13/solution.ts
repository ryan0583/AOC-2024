import path from 'path';
import { readLines } from '../../fileParser';
import { log } from 'console';
import { sum } from '../../arrays';

const lines = readLines(path.resolve(), 'solutions/13/input.txt')
  .join(';')
  .split(';;')
  .map((line) => line.split(';'))
  .map((line) => {
    const buttonA = line[0].split(' ');
    const buttonAX = buttonA[2].split('+')[1].replace(',', '');
    const buttonAY = buttonA[3].split('+')[1];
    const buttonB = line[1].split(' ');
    const buttonBX = buttonB[2].split('+')[1].replace(',', '');
    const buttonBY = buttonB[3].split('+')[1];
    const prize = line[2].split(' ');
    const prizeX = prize[1].split('=')[1].replace(',', '');
    const prizeY = prize[2].split('=')[1];

    return {
      A: { x: Number(buttonAX), y: Number(buttonAY) },
      B: { x: Number(buttonBX), y: Number(buttonBY) },
      prize: { x: Number(prizeX), y: Number(prizeY) },
    };
  });

const minCosts = [] as number[];

lines.forEach(({ A, B, prize }) => {
  const possibleButtonPressCombos = [] as number[][];

  for (let a = 0; a <= 100; a++) {
    for (let b = 0; b < 100; b++) {
      if (a * A.x + b * B.x === prize.x && a * A.y + b * B.y === prize.y) {
        possibleButtonPressCombos.push([a, b]);
      }
    }
  }

  minCosts.push(
    possibleButtonPressCombos.length
      ? Math.min(...possibleButtonPressCombos.map(([a, b]) => 3 * a + b))
      : 0
  );
});

log(sum(minCosts));
