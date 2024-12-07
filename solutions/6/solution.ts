import path from 'path';
import { readLines } from '../../fileParser';
import { log } from 'console';

const lines = readLines(path.resolve(), 'solutions/6/input.txt');

const maxY = lines.length - 1;
const maxX = lines[0].length - 1;

const startY = lines.findIndex((line) => line.includes('^'));
const startX = lines[startY].indexOf('^');

let direction = [0, -1]; //Checked input and it always starts with a ^
let currentPosition = `${startX}, ${startY}`;
let visitedPositions = new Set([currentPosition]);

while (true) {
  const [currentX, currentY] = currentPosition.split(', ').map(Number);

  const nextChar =
    lines[currentY + direction[1]]?.[currentX + direction[0]] || '.';

  if (nextChar === '#') direction = [-direction[1], direction[0]]; // Turn right

  const nextX = currentX + direction[0];
  const nextY = currentY + direction[1];

  if (nextX < 0 || nextX > maxX || nextY < 0 || nextY > maxY) {
    break;
  }

  currentPosition = `${currentX + direction[0]}, ${currentY + direction[1]}`;
  visitedPositions.add(currentPosition);
}

log(visitedPositions.size);

const loopLocations = [...visitedPositions].filter((position, index) => {
  log(index);
  currentPosition = `${startX}, ${startY}`;
  visitedPositions = new Set([currentPosition]);
  direction = [0, -1];
  const positionDirections = {
    [currentPosition]: new Set([`${direction[0]}, ${direction[1]}`]),
  };

  let inLoop = false;
  while (true) {
    const [currentX, currentY] = currentPosition.split(', ').map(Number);

    let nextChar =
      lines[currentY + direction[1]]?.[currentX + direction[0]] || '.';

    let nextPosition = `${currentX + direction[0]}, ${currentY + direction[1]}`;

    while (nextChar === '#' || nextPosition === position) {
      direction = [-direction[1], direction[0]]; // Turn right
      nextChar =
        lines[currentY + direction[1]]?.[currentX + direction[0]] || '.';
      nextPosition = `${currentX + direction[0]}, ${currentY + direction[1]}`;
    }

    const nextX = currentX + direction[0];
    const nextY = currentY + direction[1];

    if (nextX < 0 || nextX > maxX || nextY < 0 || nextY > maxY) {
      break;
    }

    currentPosition = `${currentX + direction[0]}, ${currentY + direction[1]}`;
    if (
      visitedPositions.has(currentPosition) &&
      positionDirections[currentPosition].has(
        `${direction[0]}, ${direction[1]}`
      )
    ) {
      inLoop = true;
      break;
    }
    visitedPositions.add(currentPosition);
    if (!positionDirections[currentPosition])
      positionDirections[currentPosition] = new Set();
    positionDirections[currentPosition].add(`${direction[0]}, ${direction[1]}`);
  }
  return inLoop;
});

log(loopLocations.length);
