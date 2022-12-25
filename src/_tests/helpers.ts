export const getPoint = <T extends {x: number; y: number}>(points: T[], x: number, y: number) => {
  return points.find((p) => p.x === x && p.y === y)
}

export const mapify = (obj: Record<any, any>) => {
  const map = new Map()
  for (const key in obj) map.set(key, obj[key])
  return map
}
