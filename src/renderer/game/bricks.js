let brickRowCount = 3
let brickColumnCount = 8
let brickWidth = 70
let brickHeight = 20
let brickPadding = 10
let brickOffsetTop = 20
let brickOffsetLeft = 46

export const createBricks = () => {
  let bricks = []

  for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = []

    for (let r = 0; r < brickRowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1 }
    }
  }

  return bricks
}

export const drawBricks = (bricks, ctx) => {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft
        let brickY = r * (brickHeight + brickPadding) + brickOffsetTop

        bricks[c][r].x = brickX
        bricks[c][r].y = brickY

        ctx.beginPath()
        ctx.rect(brickX, brickY, brickWidth, brickHeight)
        ctx.fillStyle = '#F9A825'
        ctx.fill()
        ctx.closePath()
      }
    }
  }
}

export const collisionDetection = (ballX, ballY, bricks) => {
  let result = false
  let count = 0

  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let b = bricks[c][r]

      if (b.status === 1) {
        count += 1
        if (ballX > b.x && ballX < b.x + brickWidth && ballY > b.y && ballY < b.y + brickHeight) {
          b.status = 0
          result = true
        }
      }
    }
  }

  return {
    bricks: bricks,
    collision: result,
    count: count
  }
}
