import path from 'path';
import { readLines } from '../../fileParser';
import { log } from 'console';

const gridWidth = 101;
const gridHeight = 103;

const robotInfos = readLines(path.resolve(), 'solutions/14/input.txt').map(
  (line) => {
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
  }
);

log(robotInfos);

for (let seconds = 0; seconds < 100; seconds++) {
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
  //   log(robotInfos);
}

const gridXMidPoint = Math.floor(gridWidth / 2);
const gridYMidPoint = Math.floor(gridHeight / 2);

const remainingRobotInfos = robotInfos.filter(
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

log(quadrant1RobotCount * quadrant2RobotCount * quadrant3RobotCount * quadrant4RobotCount);
