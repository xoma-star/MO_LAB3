const initialize = (b, c) => {
    if(Math.min(...b) >= 0) return [new Array(c.length).fill(0).map((_, i) => i + 1), new Array(c.length).fill(0).map((_, i) => i + 1 + c.length)]
    throw('Алгоритм не может работать с этими значениями')
}

const pivot = (N, B, A, b, c, v, l, e) => {
    let pivotA = new Array(b.length).fill([])
    for(let i = 0; i < pivotA.length; i++){
        pivotA[i] = new Array(c.length).fill(0)
    }
    let pivotb = new Array(b.length).fill(0)
    let pivotc = new Array(c.length).fill(0)

    // Коэффициенты уравнения для новой основной переменной
    pivotb[l] = b[l] / A[l][e]
    for(let j = 0; j < N.length; j++) if (j !== e) pivotA[l][j] = A[l][j] / A[l][e]
    pivotA[l][e] = 1 / A[l][e]

    // Коэффициенты остальных ограничений
    for(let i = 0; i < B.length; i++){
        if(i !== l){
            pivotb[i] = b[i] - A[i][e] * pivotb[l]
            for(let j = 0; j < N.length; j++) if(j !== e) pivotA[i][j] = A[i][j] - A[i][e] * pivotA[l][j]
            pivotA[i][e] = -A[i][e] * pivotA[l][e]
        }
    }

    // Целевая функция
    let pivotv = v + c[e] * pivotb[l]
    for(let j = 0; j < N.length; j++) if(j !== e) pivotc[j] = c[j] - c[e] * pivotA[l][j]
    pivotc[e] = -c[e] * pivotA[l][e]

    // Новые наборы основных и неосновных переменных
    let pivotN = new Array(N.length).fill(0)
    let pivotB = new Array(B.length).fill(0)

    let a = N[e]
    b = B[l]

    for(let x = 0; x < pivotN.length; x++){
        if(x === e) pivotN[x] = b
        else pivotN[x] = N[x]
    }

    for(let x = 0; x < pivotB.length; x++){
        if(x === l) pivotB[x] = a
        else pivotB[x] = B[x]
    }

    return [pivotN, pivotB, pivotA, pivotb, pivotc, pivotv]
}

const simplex = (A, b, c) => {
    let v = 0
    let [N, B] = initialize(b, c)
    let delta = new Array(N.length).fill(0)

    for(let j = 0; j < N.length - 1; j++){
        if(c[j] > 0){
            let e = j
            for(let i = 0; i < B.length; i++){
                if(A[i][e] > 0) delta[i] = b[i] / A[i][e]
                else delta[i] = Infinity
            }
            let l = delta.indexOf(Math.min(...delta))
            if(delta[l] === Infinity) throw('Неограниченный')
            else [N, B, A, b, c, v] = pivot(N, B, A, b, c, v, l, e)
        }
    }

    for(let i = 0; i < N.length + B.length; i++){
        if(B.indexOf(i + 1) >= 0) console.log(`x${i + 1}: ${b[B.indexOf(i + 1)]}`)
        else console.log(`x${i + 1}: 0`)
    }

    console.log(`z: ${v}`)
}

export default simplex