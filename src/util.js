export function calculateMoveVector(origin, target) {
  const dX = target.x - origin.x
  const dY = target.y - origin.y

  const magnitude = Math.sqrt(dX * dX + dY * dY)

  const vX = dX / magnitude
  const vY = dY / magnitude

  return {
    vX,
    vY
  }
}

export function randomItem(arr) {
  return arr[rand(0, arr.length - 1)]
}

export function rand(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
