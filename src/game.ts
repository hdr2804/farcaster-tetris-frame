import { PIECES, KEYS } from "./pieces"

export const W = 10
export const H = 20

export function board() {
  return Array.from({ length: H }, () => Array(W).fill(0))
}

export function randomPiece() {
  const key = KEYS[Math.floor(Math.random() * KEYS.length)]
  return { shape: PIECES[key][0], x: 3, y: 0 }
}

export function collide(b, p, ox = 0, oy = 0) {
  return p.shape.some((r, y) =>
    r.some((v, x) =>
      v && b[y + p.y + oy]?.[x + p.x + ox] !== 0
    )
  )
}

export function merge(b, p) {
  p.shape.forEach((r, y) =>
    r.forEach((v, x) => {
      if (v) b[y + p.y][x + p.x] = 1
    })
  )
}

export function clear(b) {
  let c = 0
  for (let y = H - 1; y >= 0; y--) {
    if (b[y].every(v => v)) {
      b.splice(y, 1)
      b.unshift(Array(W).fill(0))
      c++
      y++
    }
  }
  return c
}
