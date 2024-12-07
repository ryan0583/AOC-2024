import path from 'path';
import { readLines } from '../../fileParser';
import { log } from 'console';

const lines = readLines(path.resolve(), 'solutions/6/input.txt');

const maxY = lines.length - 1;
const maxX = lines[0].length - 1;
const startChar = '^';

type Direction = { x: number; y: number };

type CurrentPosition = {
  x: number;
  y: number;
  direction: Direction;
};

const getNextChar = ({ x, y, direction }: CurrentPosition) =>
  lines[y + direction.y]?.[x + direction.x] || '.';

const getNextPosition = ({ x, y, direction }: CurrentPosition) =>
  `${x + direction.x}, ${y + direction.y}`;

const turnRight = ({ direction }: { direction: Direction }) => ({
  x: -direction.y,
  y: direction.x,
});

const startY = lines.findIndex((line) => line.includes(startChar));
const startX = lines[startY].indexOf(startChar);

const initCurrentPositionsAndVisitedPositions = () => {
  const currentPosition = {
    x: startX,
    y: startY,
    direction: {
      x: 0,
      y: -1,
    }, //Checked input and it always starts with a ^
  };
  return {
    currentPosition,
    visitedPositions: new Set([`${currentPosition.x}, ${currentPosition.y}`]),
  };
};

const isOnGrid = ({ x, y }: CurrentPosition) =>
  x >= 0 && x <= maxX && y >= 0 && y <= maxY;

const getVisitedPositions = () => {
  const { currentPosition, visitedPositions } =
    initCurrentPositionsAndVisitedPositions();

  while (isOnGrid(currentPosition)) {
    visitedPositions.add(`${currentPosition.x}, ${currentPosition.y}`);

    const nextChar = getNextChar(currentPosition);
    if (nextChar === '#')
      currentPosition.direction = turnRight(currentPosition);

    currentPosition.x = currentPosition.x + currentPosition.direction.x;
    currentPosition.y = currentPosition.y + currentPosition.direction.y;
  }
  return visitedPositions;
};

log(getVisitedPositions().size);

const loopLocations = [...getVisitedPositions()].filter((position) => {
  const { currentPosition, visitedPositions } =
    initCurrentPositionsAndVisitedPositions();

  const positionDirections = {
    [`${currentPosition.x}, ${currentPosition.y}`]: new Set([
      `${currentPosition.direction.x}, ${currentPosition.direction.y}`,
    ]),
  };

  let inLoop = false;

  while (!inLoop && isOnGrid(currentPosition)) {
    let nextChar = getNextChar(currentPosition);
    let nextPosition = getNextPosition(currentPosition);

    while (nextChar === '#' || nextPosition === position) {
      currentPosition.direction = turnRight(currentPosition);
      nextChar = getNextChar(currentPosition);
      nextPosition = getNextPosition(currentPosition);
    }

    currentPosition.x = currentPosition.x + currentPosition.direction.x;
    currentPosition.y = currentPosition.y + currentPosition.direction.y;
    const positionLookup = `${currentPosition.x}, ${currentPosition.y}`;
    const directionLookup = `${currentPosition.direction.x}, ${currentPosition.direction.y}`;

    if (
      visitedPositions.has(positionLookup) &&
      positionDirections[positionLookup].has(directionLookup)
    )
      inLoop = true;

    if (!positionDirections[positionLookup])
      positionDirections[positionLookup] = new Set();
    positionDirections[positionLookup].add(directionLookup);
    visitedPositions.add(`${currentPosition.x}, ${currentPosition.y}`);
  }

  return inLoop;
});

log(loopLocations.length);
