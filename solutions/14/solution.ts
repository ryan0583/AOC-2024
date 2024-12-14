import path from 'path';
import { readLines } from '../../fileParser';
import { log } from 'console';
import fs from 'fs';
import { PositionAndVelocity } from '../../types';

const gridWidth = 101;
const gridHeight = 103;

const gridDirectory = 'solutions/14/grids';

fs.readdirSync(gridDirectory).forEach((f) =>
  fs.rmSync(`${gridDirectory}/${f}`)
);

const parsedRobotInfos = readLines(
  path.resolve(),
  'solutions/14/input.txt'
).map((line) => {
  const [position, velocity] = line
    .split(' ')
    .map((item) => item.split('=')[1]);
  const robotInfo = {
    position: {
      x: Number(position.split(',')[0]),
      y: Number(position.split(',')[1]),
    },
    velocity: {
      x: Number(velocity.split(',')[0]),
      y: Number(velocity.split(',')[1]),
    },
  };
  return robotInfo;
});

const robotInfosPt1Copy = JSON.parse(JSON.stringify(parsedRobotInfos));

const moveRobots = (robotInfos: PositionAndVelocity[]) => {
  robotInfos.forEach((robotInfo) => {
    robotInfo.position.x = robotInfo.position.x + robotInfo.velocity.x;
    robotInfo.position.x =
      robotInfo.position.x < 0
        ? gridWidth + robotInfo.position.x
        : robotInfo.position.x;
    robotInfo.position.x = robotInfo.position.x % gridWidth;

    robotInfo.position.y =
      (robotInfo.position.y + robotInfo.velocity.y) % gridHeight;
    robotInfo.position.y =
      robotInfo.position.y < 0
        ? gridHeight + robotInfo.position.y
        : robotInfo.position.y;
    robotInfo.position.y = robotInfo.position.y % gridHeight;
  });
};

for (let seconds = 0; seconds < 100; seconds++) {
  moveRobots(robotInfosPt1Copy);
}

const gridXMidPoint = Math.floor(gridWidth / 2);
const gridYMidPoint = Math.floor(gridHeight / 2);

const remainingRobotInfos = robotInfosPt1Copy.filter(
  (robotInfo) =>
    robotInfo.position.x !== gridXMidPoint &&
    robotInfo.position.y !== gridYMidPoint
);

const quadrant1RobotCount = remainingRobotInfos.filter(
  (robotInfo) =>
    robotInfo.position.x < gridXMidPoint && robotInfo.position.y < gridYMidPoint
).length;

const quadrant2RobotCount = remainingRobotInfos.filter(
  (robotInfo) =>
    robotInfo.position.x > gridXMidPoint && robotInfo.position.y < gridYMidPoint
).length;

const quadrant3RobotCount = remainingRobotInfos.filter(
  (robotInfo) =>
    robotInfo.position.x < gridXMidPoint && robotInfo.position.y > gridYMidPoint
).length;

const quadrant4RobotCount = remainingRobotInfos.filter(
  (robotInfo) =>
    robotInfo.position.x > gridXMidPoint && robotInfo.position.y > gridYMidPoint
).length;

log(
  quadrant1RobotCount *
    quadrant2RobotCount *
    quadrant3RobotCount *
    quadrant4RobotCount
);

// Part 2
const robotInfosPt2Copy = JSON.parse(JSON.stringify(parsedRobotInfos));

const allRobotsUniquelyPositioned = (robotInfos: PositionAndVelocity) =>
  robotInfosPt2Copy.every(
    (robotInfo, index) =>
      !robotInfosPt2Copy.some(
        (robotInfo2, index2) =>
          index !== index2 &&
          robotInfo.position.x === robotInfo2.position.x &&
          robotInfo.position.y === robotInfo2.position.y
      )
  );

const printGrid = (seconds: number) => {
  const myConsole = new console.Console(
    fs.createWriteStream(`${gridDirectory}/${seconds}.txt`)
  );
  for (let y = 0; y < gridHeight; y++) {
    const line = [] as string[];
    for (let x = 0; x < gridWidth; x++) {
      const robotInfo = robotInfosPt2Copy.find(
        (robotInfo) => robotInfo.position.x === x && robotInfo.position.y === y
      );
      if (robotInfo) {
        line.push('#');
      } else {
        line.push('.');
      }
    }
    myConsole.log(line.join(''));
  }
};

let seconds = 0;
while (true) {
  seconds++;
  moveRobots(robotInfosPt2Copy);

  if (allRobotsUniquelyPositioned(robotInfosPt2Copy)) {
    printGrid(seconds);
    break;
  }
}

log(seconds);
