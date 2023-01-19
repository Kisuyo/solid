import { createEffect, createSignal, For, on, Index, Component } from "solid-js"
import { css } from "solid-styled"
import { useKeyDownList } from "@solid-primitives/keyboard"
import { updatePath } from "solid-js/store/types/store"

const [keys, { event }] = useKeyDownList()

export default function Home() {
  // 0 empty
  // 1 player 1
  // 2 player 2
  // 3 floor

  const [grid, setGrid] = createSignal([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 0],
    [3, 3, 3, 3, 3, 3, 3, 3],
  ])

  // createEffect(() => {
  //   console.log(grid, "grid")
  // })

  const Box: Component<{ x: number; y: number }> = ({ x, y }) => {
    let copy
    let howFarY = 1
    let howFarX = 1
    return (
      <button
        onClick={() => {
          setGrid((p) => {
            copy = p.slice()
            copy[y][x] += 1
            if (copy[y][x] === 5) copy[y][x] = 0
            checkForRowOf5(copy[y][x])
            gravity(copy[y][x])
            return copy
          })
        }}
      >
        {grid()[y][x]}
      </button>
    )

    function checkForRowOf5(grid) {
      let count = 1
      let newX = x
      let newY = y
      console.log(y, newX)
      while (1 === copy[y + howFarY][x - howFarX]) {
        count += 1
        howFarX += 1
      }
      if (0 === copy[y + howFarY][x - howFarX]) {
        howFarX = 1
      }
      while (1 === copy[y + howFarY][x + howFarX]) {
        count += 1
        howFarX += 1
      }

      console.log(count, "count")
      if (count >= 4) {
        console.log("WINNER!!!")
      }
    }
    function gravity(grid) {
      while (0 === copy[y + howFarY][x]) {
        howFarY += 1
        copy[y][x] = 0
        console.log("do")
      }
      if (1 === copy[y + howFarY][x] || 3 === copy[y + howFarY][x]) {
        copy[y + howFarY - 1][x] = 1
      }
    }
  }

  css`
    .Main {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .boxWrapper {
      background-color: #9a9a9a;
      display: grid;
      height: 600px;
      width: 500px;
      border-radius: 50px;
      grid-template-columns: repeat(8, 1fr);
      grid-template-rows: repeat(8, 1fr);
      padding: 50px;
      margin-top: 200px;
    }
    .box {
      background-color: #737272;
      border-radius: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .box:hover {
      opacity: 30%;
      background-color: red;
    }
    .boxNew {
      background-color: #82ed7e;
      border-radius: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `

  return (
    <main class="Main">
      <div class="boxWrapper">
        <Index each={grid()}>
          {(_, y) => (
            <Index each={grid()[y]}>{(_, x) => <Box x={x} y={y} />}</Index>
          )}
        </Index>
      </div>
    </main>
  )
}
