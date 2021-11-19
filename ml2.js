/**
 * Copyright 2021 yan-930521  All Rights Reserved.
 */
const { log, clear } = console

// i    j    k
function sigmoid(x) {
  return (1 / (1 + Math.exp(-x)))
}

function makeAry(a, b) {
  var u = []
  for (let i in a) {
    u.push(b)
  }
  return u
}

function perceptron(x, y, z, eta, t) {
  clear()
  let w = (makeAry(x[0], 0))
  let J = []
  let Y_vec = []
  let err = 0
  let n = 0

  while (t > n) {
    //求點積
    for (let j in x) {
      let sum = 0 //點積
      for (let i in x[j]) {
        sum += (w[i] * x[j][i])
      }

      //以閥值判斷sigmoid後的參數
      //1 是
      //0 否
      let Y
      if (sum > z) {
        Y = 1
      } else {
        Y = 0
      }
      Y_vec.push(Y)
      for (let i in x[j]) {
        w[i] += eta * x[j][i] * (y[j] - Y)
      }
    }
    n++
    err = 0
    for (let j in w) {
      err += (y[j] - Y_vec[j]) * (y[j] - Y_vec[j])
    }
    J.push(err / 2)
  }
  return [w, J]
}

function check(x, w, z) {
  let sum = 0 //點積
  for (let i in x) {
    sum += (w[i] * x[i])
  }
  //以閥值判斷sigmoid後的參數
  let Y
  let p
  if (sum > z) {
    Y = 1
    p = sigmoid(sum - z)
  } else {
    Y = 0
    p = 0
  }
  return [Y, p]
}

//特徵數:3

let x = [
  [1, 0, 0],
  [1, 0, 1],
  [1, 1, 0],
  [1, 1, 1],
]
let y = [1, 1, 1, 0]

//疊代次數
let t = 10
//閾值
let z = 0
//學習率
let eta = 0.02

let ans = perceptron(x, y, z, eta, t)

//W
log(ans[0])

let x3 = [1, 1, 0]

log(check(x3, ans[0], z))