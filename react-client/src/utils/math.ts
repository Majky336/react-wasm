export const addTwoInts = (a: number, b: number) => a + b;

export const fibonaci = (n: number): number => {
  if (n === 1 || n === 0) {
    return n;
  }

  return fibonaci(n - 1) + fibonaci(n - 2);
};
