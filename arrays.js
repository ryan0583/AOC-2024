export const sum = (arr) => arr.reduce((sum, value) => sum + value, 0);

export const product = (arr) => arr.reduce((product, value) => product * value, 1);

export const overlapCount = (a, b) => b.filter((entry) => a.includes(entry)).length;

const gcd2 = (a, b) => {
  if (!b) return b === 0 ? a : NaN;
  return gcd2(b, a % b);
};

export const gcd = (array) => array.reduce((acc, entry) => gcd2(entry, acc), 0);

const lcm2 = (a, b) => (a * b) / gcd2(a, b);

export const lcm = (array) => array.reduce((acc, entry) => lcm2(entry, acc), 1);
