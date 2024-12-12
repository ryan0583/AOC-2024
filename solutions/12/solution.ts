import path from 'path';
import { readLines } from '../../fileParser';
import { log } from '../../logger';
import { Position } from '../../types';
import { sum } from '../../arrays';

const lines = readLines(path.resolve(), 'solutions/12/input.txt');

const maxY = lines.length - 1;
const maxX = lines[0].length - 1;

const isOnGrid = ({ x, y }: Position) =>
  x >= 0 && x <= maxX && y >= 0 && y <= maxY;

const plantTypeRegionsMapping = {} as Record<string, Position[][]>;

const checkArr = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
];

const appendConnectedPoints = (
  { x, y }: Position,
  plantType: string,
  region: Position[]
) => {
  let revisedRegion = region;

  checkArr.forEach(([dx, dy]) => {
    const newX = x + dx;
    const newY = y + dy;
    if (
      isOnGrid({ x: newX, y: newY }) &&
      lines[newY]?.[newX] === plantType &&
      !revisedRegion.some(({ x, y }) => x === newX && y === newY)
    ) {
      revisedRegion = appendConnectedPoints({ x: newX, y: newY }, plantType, [
        ...revisedRegion,
        { x: newX, y: newY },
      ]);
    }
  });

  return revisedRegion;
};

for (let y = 0; y < lines.length; y++) {
  for (let x = 0; x < lines[y].length; x++) {
    const plantType = lines[y][x];
    const existingRegions = plantTypeRegionsMapping[plantType];
    if (existingRegions) {
      if (
        !existingRegions.some((region) =>
          region.some(({ x: rx, y: ry }) => rx === x && ry === y)
        )
      ) {
        //New region - find all connected points of the same type
        const region = appendConnectedPoints({ x, y }, plantType, [{ x, y }]);
        existingRegions.push(region);
      }
    } else {
      plantTypeRegionsMapping[plantType] = [
        appendConnectedPoints({ x, y }, plantType, [{ x, y }]),
      ];
    }
  }
}

const getPerimeterPoints = (region: Position[]) => {
  const perimeterPoints = [] as Position[];
  region.map(({ x, y }) => {
    if (!region.some(({ x: rx, y: ry }) => rx === x - 1 && ry === y)) {
      perimeterPoints.push({ x: x - 1, y });
    }
    if (!region.some(({ x: rx, y: ry }) => rx === x + 1 && ry === y)) {
      perimeterPoints.push({ x: x + 1, y });
    }
    if (!region.some(({ x: rx, y: ry }) => rx === x && ry === y - 1)) {
      perimeterPoints.push({ x, y: y - 1 });
    }
    if (!region.some(({ x: rx, y: ry }) => rx === x && ry === y + 1)) {
      perimeterPoints.push({ x, y: y + 1 });
    }
  });
  return perimeterPoints;
};

const calculatePerimeter = (region: Position[]) =>
  getPerimeterPoints(region).length;

log(
  sum(
    Object.entries(plantTypeRegionsMapping).flatMap(([k, v]) =>
      v.map((region) => {
        const area = region.length;
        const perimeter = calculatePerimeter(region);
        return area * perimeter;
      })
    )
  )
);

const calculateSides = (region: Position[]) => {
  const perimeterPoints = getPerimeterPoints(region);

  const sides = [] as Position[][];
  perimeterPoints.sort((a, b) => a.y < b.y || (a.y === b.y && a.x < b.x) ? -1 : 1 ).forEach(({ x, y }) => {
    const existingSide = sides.find(
      (side) =>
        !side.some(({ x: sx, y: sy }) => sx === x && sy === y) &&
        ((side.every(({ x: sx }) => sx === x) &&
          side.find(
            ({ x: sx, y: sy }) =>
              (sx === x && sy === y - 1)
          )) ||
          (side.every(({ y: sy }) => sy === y) &&
            side.find(
              ({ x: sx, y: sy }) =>
                (sx === x - 1 && sy === y)
            )))
    );
    if (existingSide) {
      existingSide.push({ x, y });
    } else {
      sides.push([{ x, y }]);
    }
  });

  return sides.length;
};

log(
  sum(
    Object.entries(plantTypeRegionsMapping).flatMap(([k, v]) =>
      v.map((region) => {
        const area = region.length;
        const sides = calculateSides(region);
        return area * sides;
      })
    )
  )
);
