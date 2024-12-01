import { readLines } from '../../fileParser.js';
import { log } from '../../logger.js';
import path from 'path';
import { sum } from '../../arrays.js';

const lines = readLines(path.resolve(), 'solutions/1/input.txt');

const splitInput = lines.map((line) => line.split('   '));

const list1 = splitInput.map((line) => line[0]).sort();

const list2 = splitInput.map((line) => line[1]).sort();

const diffs = list1.map((num, i) => Math.abs(num - list2[i]));

const diffSum = sum(diffs);

log(diffSum);

const numCount = list2.reduce((acc, num) => {
  acc[num] = acc[num] ? acc[num] + 1 : 1;
  return acc;
}, {});

const similarityScore = sum(list1.map((num) => num * (numCount[num] || 0)));

log(similarityScore);
