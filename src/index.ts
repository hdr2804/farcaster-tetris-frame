import { Frog } from "frog"
import { board, randomPiece, collide, merge, clear } from "./game"
import { render } from "./render"

export const app = new Frog({ title: "Tetris Frame" })

app.frame("/", async c => {
  let state = c.frameData?.state ?? {
    board: board(),
    piece: randomPiece(),
    score: 0
  }

  const a = c.buttonValue

  if (a === "L" && !collide(state.board, state.piece, -1)) state.piece.x--
  if (a === "R" && !collide(state.board, state.piece, 1)) state.piece.x++
  if (a === "D") {
    if (!collide(state.board, state.piece, 0, 1)) state.piece.y++
    else {
      merge(state.board, state.piece)
      state.score += clear(state.board) * 100
      state.piece = randomPiece()
    }
  }

  return c.res({
    image: render(state.board, state.piece, state.score),
    state,
    intents: [
      c.button("⬅️", { value: "L" }),
      c.button("➡️", { value: "R" }),
      c.button("⬇️", { value: "D" })
    ]
  })
})

export default app
