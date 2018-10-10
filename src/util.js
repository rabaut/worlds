export const calculateMoveVector = (origin, target) => {
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