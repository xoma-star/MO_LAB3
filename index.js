import simplex from "./simplex.js";

const A = [[1.01, 1.01, 9.45, 1400],
    [1/500, 1/600, 0, 0],
    [0, 0, 1/30, 0],
    [0, 0, 0, 1/25]]
const b = [14000, 21, 16, 18]
const c = [24, 27, 138, 78]

simplex(A, b, c)
