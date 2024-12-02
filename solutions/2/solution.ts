import path from 'path';
import { readLines } from "../../fileParser.ts";
import { log } from "../../logger.ts";

const lines = readLines(path.resolve(), 'solutions/2/input.txt');

const splitInput = lines.map((line) => line.split(' ').map(Number));

log(splitInput)

const safe = splitInput.map((line) => {
    const isFirstDiffIncrease = line[1] > line[0];
    const isSafe = line.every((num, index) => {
        if (index === 0) return true
        const isSameDirection = (num > line[index - 1]) === isFirstDiffIncrease;
        const diff = num - line[index - 1];
        return isSameDirection && 1 <= Math.abs(diff) && Math.abs(diff) <= 3;
    })
    return isSafe
})

log(safe.filter(Boolean).length);