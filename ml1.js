const { log, clear } = console

function perceptron(x, y, z, eta, t, ans) {
  clear()
  let w = []
  let result = []
  let Y_vec = []
  let errors = []
  let J = []
  //初始化權重
  //長度需與特徵數量相同
  for (let i in x[0]) {
    w.push(0)
  }

  for (let i in y) {
    Y_vec.push(1)
    errors.push(1)
  }

  log('初始化權重:' + w)

  let n = 0

  while (t > n) {
    //權重乘以輸入，加總
    //求點積
    result = []
    for (let a in x) {
      let resultIn = []
      for (let b in x[a]) {
        resultIn.push(w[b] * x[a][b])
        log('權重乘以輸入:' + resultIn)
      }
      let all = 0
      for (let c in resultIn) {
        all += Number(resultIn[c])
      }
      result.push(all)
      log('點積-' + result)
    }


    //激活函數
    //判斷結果y (只有0和1兩種)

    log('激活函數')

    let resultY = []
    for (let a in result) {
      if (result[a] > z) {
        resultY.push(ans[1])
      } else {
        resultY.push(ans[0])
      }
      Y_vec[a] = resultY[a]
    }

    //判斷與結果的差異
    //權重 += 學習率*(結果 - 預測值)*原本的特徵

    for (let a in x) {
      if (y[a] != resultY[a]) {
        log('判斷失敗')
      } else {
        log('預測成功')
      }
      for (let b = 0; b < w.length; b++) {

        w[b] += eta * (y[a] - resultY[a]) * x[a][b]

        log(`更新=>，w ${b}  + ${eta * (y[a] - resultY[a]) * x[a][b]}`)
      }
      log('更新完畢，w:' + w)
    }

    n++

    for (let a = 0; a < y.length; a++) {
      errors[a] = Math.pow((y[a] - Y_vec[a]), 2)
    }
    let all2 = 0
    for (let c in errors) {
      all2 += Number(errors[c])
    }
    J.push(all2 / 2)
  }
  return [w, J]
}

function check(x, z, eta, w) {
  //求點積
  let ALL = 0
  for (let a in x) {
    ALL += w[a] * x[a]
  }
  return ALL
}

function judge(x, z, eta, w) {
  //求點積
  let ALL = 0
  for (let a in x) {
    ALL += w[a] * x[a]
  }
  return ALL>z?0:1
}

// 測資 ( 特徵數:3 )

let x = [[1, 0, 0, 1, 1, 1, 0, 1, 0, 0], [0, 1, 1, 0, 0, 0, 1, 0, 1, 1], [0, 0, 1, 0, 1, 1, 1, 0, 1, 1], [1, 1, 0, 0, 0, 1, 0, 1, 0, 1], [1, 0, 0, 0, 1, 1, 0, 1, 0, 1]]

let y = [0, 1, 1, 0, 1]

//種類
let ans_type = [0, 1]
//疊代次數
let t = 11
//閾值
let z = 0.5
//學習率
let eta = 0.1

let ans = perceptron(x, y, z, eta, t, ans_type)

let newW = ans[0]

log(ans)

let x2 = [2, 1, 1, 7, 2, 0, 1, 0, 1, 1]

log(judge(x2, z, eta, newW))