import { W, H } from "./game"

export function render(b, p, s) {
  const z = 18
  let r = ""

  b.forEach((row, y) =>
    row.forEach((c, x) =>
      r += `<rect x="${x*z}" y="${y*z}" width="${z}" height="${z}"
      fill="${c ? "#22ffcc" : "#111"}" stroke="#333"/>`
    )
  )

  p.shape.forEach((row, y) =>
    row.forEach((c, x) => {
      if (c)
        r += `<rect x="${(p.x+x)*z}" y="${(p.y+y)*z}"
        width="${z}" height="${z}" fill="#ffcc00"/>`
    })
  )

  return `<svg xmlns="http://www.w3.org/2000/svg"
    width="${W*z}" height="${H*z+32}">
    ${r}
    <text x="6" y="${H*z+22}" fill="white">Score: ${s}</text>
  </svg>`
}
