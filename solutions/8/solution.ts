import path from 'path';
import { readLines } from '../../fileParser';
import { log } from 'console';

const lines = readLines(path.resolve(), 'solutions/8/input.txt');

const maxY = lines.length - 1;
const maxX = lines[0].length - 1;

const antennaPositionsLookup = {} as Record<string, { x: number; y: number }[]>;

for (let y = 0; y <= maxY; y++) {
  for (let x = 0; x <= maxX; x++) {
    const c = lines[y][x];
    if (c !== '.') {
      antennaPositionsLookup[c] = [
        ...(antennaPositionsLookup[c] || []),
        { x, y },
      ];
    }
  }
}

const antinodePositions = [
  ...new Set(
    Object.values(antennaPositionsLookup)
      .flatMap((positions) => {
        const antinodePositions = [] as { x: number; y: number }[];
        for (let i = 0; i < positions.length; i++) {
          const firstNode = positions[i];
          for (let j = i + 1; j < positions.length; j++) {
            const secondNode = positions[j];
            const xDiff = secondNode.x - firstNode.x;
            const yDiff = secondNode.y - firstNode.y;
            const firstAntinode = {
              x: firstNode.x - xDiff,
              y: firstNode.y - yDiff,
            };
            const secondAntinode = {
              x: secondNode.x + xDiff,
              y: secondNode.y + yDiff,
            };
            antinodePositions.push(firstAntinode, secondAntinode);
          }
        }
        return antinodePositions;
      })
      .filter(({ x, y }) => x >= 0 && x <= maxX && y >= 0 && y <= maxY)
      .map(({ x, y }) => `${x},${y}`)
  ),
];

log(antinodePositions.length);

const antinodePositionsPt2 = [
  ...new Set(
    Object.values(antennaPositionsLookup)
      .flatMap((positions) => {
        const antinodePositions = [] as { x: number; y: number }[];
        for (let i = 0; i < positions.length; i++) {
          const firstNode = positions[i];
          for (let j = i + 1; j < positions.length; j++) {
            const secondNode = positions[j];
            const xDiff = secondNode.x - firstNode.x;
            const yDiff = secondNode.y - firstNode.y;
            let multiplier = 1;
            antinodePositions.push(firstNode, secondNode);
            while (multiplier < maxX || multiplier < maxY) {
              const firstAntinode = {
                x: firstNode.x - multiplier * xDiff,
                y: firstNode.y - multiplier * yDiff,
              };
              const secondAntinode = {
                x: secondNode.x + multiplier * xDiff,
                y: secondNode.y + multiplier * yDiff,
              };
              antinodePositions.push(firstAntinode, secondAntinode);
              multiplier++;
            }
          }
        }
        return antinodePositions;
      })
      .filter(({ x, y }) => x >= 0 && x <= maxX && y >= 0 && y <= maxY)
      .map(({ x, y }) => `${x},${y}`)
  ),
];

log(antinodePositionsPt2.length);
