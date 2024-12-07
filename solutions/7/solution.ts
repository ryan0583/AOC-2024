import path from 'path';
import { readLines } from '../../fileParser';
import { log } from 'console';
import { sum } from '../../arrays';

const lines = readLines(path.resolve(), 'solutions/7/input.txt');

const equations = lines.map((line) => ({
  result: Number(line.split(': ')[0]),
  inputVals: line.split(': ')[1].split(' ').map(Number),
}));

const operators = ['+', '*'];

const filteredEquations = equations.filter(({ result, inputVals }) => {
  const results = inputVals.reduce<number[]>((acc, val, index) => {
    if (index === 0) return acc;
    return operators.flatMap((operator) =>
      acc.map((num) => (operator === '+' ? num + val : num * val))
    );
  }, [inputVals[0]]);
  return results.includes(result);
});

log(sum(filteredEquations.map(({ result }) => result)));

const pt2operators = ['+', '||', '*'];

const filteredEquationsPt2 = equations.filter(({ result, inputVals }) => {
    const results = inputVals.reduce<number[]>((acc, val, index) => {
      if (index === 0) return acc;
      return pt2operators.flatMap((operator) =>
        acc.map((num) => {
            if (operator === '+') return num + val;
            if (operator === '||') return Number(`${num}${val}`);
            return num * val;
        })
      );
    }, [inputVals[0]]);
    return results.includes(result);
  });

  log(sum(filteredEquationsPt2.map(({ result }) => result)));
