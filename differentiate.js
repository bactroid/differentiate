const splitEq = eq => eq.split('+')

const splitExp = exp => exp.split('^')

const splitCoe = str => {
  const index = str.indexOf('x')
  return index === -1
    ? [str, '']
    : [str.substring(0, index), str.substring(index)]
}

const handleMinus = str =>
  str
    .replace(/-x/g, '-1x')
    .replace(/-/g, '+-')
    .replace(/^\+/, '')

const parseEq = str =>
  splitEq(handleMinus(str))
    .map(splitExp)
    .map(x => [].concat(splitCoe(x[0]), x.slice(1)))

const calcDerivative = arr =>
  arr[1] === 'x'
    ? [].concat(
        (parseInt(arr[0]) || 1) * (arr[2] || 1),
        arr[1],
        (arr[2] || 1) - 1
      )
    : [0]

const reduceTerms = arr =>
  arr[1] === 'x' && arr[2] === 0
    ? [].concat(arr[0])
    : arr

const differentiate = eqArr =>
  eqArr
    .map(calcDerivative)
    .map(reduceTerms)

const calcPolyElem = (acc, val) => {
  let num = val.length === 1
    ? val[0]
    : val[0] * Math.pow(val[1], val[2])
  return acc + num
}

const solve = subEqArr =>
  subEqArr.reduce(calcPolyElem, 0)

const substituteX = (eqArr, point) =>
  eqArr.map(x => {
    let result = [].concat(x)
    if (result[1] === 'x') {
      result[1] = point
    }
    return result
  })

const differentiateAndEval = (eq, point) =>
  solve(substituteX(differentiate(parseEq(eq)), point))

module.exports = {
  differentiateAndEval,
  splitEq,
  splitExp,
  splitCoe,
  parseEq,
  calcDerivative,
  differentiate,
  calcPolyElem,
  reduceTerms,
  solve,
  substituteX,
  handleMinus
}