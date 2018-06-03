<template>
  <v-card raised>
    <v-card-media height="100%">
      <canvas ref="canvas" />
    </v-card-media>
  </v-card>
</template>

<script>
export default {
  name: 'game-window',
  computed: {
    ctx () {
      let canvas = this.$refs.canvas
      return canvas.getContext('2d')
    },
    maxHeight () {
      let canvas = this.$refs.canvas
      return canvas.height
    },
    maxWidth () {
      let canvas = this.$refs.canvas
      return canvas.width
    }
  },
  data () {
    return {
      ballX: 0,
      ballY: 0,
      yFactor: 2,
      xFactor: 2,
      ballRadius: 10,
      ballColour: '#F9A825',
      instance: null,
      paddleHeight: 10,
      paddleWidth: 75,
      paddleX: 0,
      paddleY: 0,
      rightPressed: false,
      leftPressed: false
    }
  },
  methods: {
    drawBall () {
      this.ctx.beginPath()
      this.ctx.arc(this.ballX, this.ballY, this.ballRadius, 0, Math.PI * 2)
      this.ctx.fillStyle = this.ballColour
      this.ctx.fill()
      this.ctx.closePath()
    },
    drawPaddle () {
      this.ctx.beginPath()
      this.ctx.rect(this.paddleX, this.paddleY, this.paddleWidth, this.paddleHeight)
      this.ctx.fillStyle = '#F9A825'
      this.ctx.fill()
      this.ctx.closePath()
    },
    update () {
      this.ctx.clearRect(0, 0, this.maxWidth, this.maxHeight)

      this.drawBall()
      this.drawPaddle()

      if (this.ballY <= 0 + this.ballRadius) {
        this.yFactor = 2
      } else if (this.ballY >= this.maxHeight - this.ballRadius) {
        if (this.ballX > this.paddleX && this.ballX < this.paddleX + this.paddleWidth) {
          this.yFactor = -2
          this.$store.commit('score/INCREASE_CURRENT_SCORE')
        } else {
          this.resetGame()
          this.sendSignal()
        }
      }

      if (this.ballX <= 0 + this.ballRadius) {
        this.xFactor = 2
      } else if (this.ballX >= this.maxWidth - this.ballRadius) {
        this.xFactor = -2
      }

      if (this.rightPressed && this.paddleX < this.maxWidth - this.paddleWidth) {
        this.paddleX += 7
      } else if (this.leftPressed && this.paddleX > 0) {
        this.paddleX -= 7
      }

      this.ballY += this.yFactor
      this.ballX += this.xFactor
    },
    startGame () {
      this.instance = setInterval(() => this.update(), 10)
    },
    pauseGame () {
      clearInterval(this.instance)
      this.instance = null
    },
    resetGame () {
      this.pauseGame()

      let canvas = this.$refs.canvas
      this.ballX = canvas.width / 2
      this.ballY = canvas.height / 2

      this.paddleX = (canvas.width - this.paddleWidth) / 2
      this.paddleY = (canvas.height - this.paddleHeight)

      this.xFactor = 2
      this.yFactor = 2

      this.startGame()
    },
    keyDownHandler (e) {
      switch (e.keyCode) {
        case 39:
          this.rightPressed = true
          break
        case 68:
          this.rightPressed = true
          break
        case 37:
          this.leftPressed = true
          break
        case 65:
          this.leftPressed = true
          break
        default:
          break
      }
    },
    keyUpHandler (e) {
      switch (e.keyCode) {
        case 39:
          this.rightPressed = false
          break
        case 68:
          this.rightPressed = false
          break
        case 37:
          this.leftPressed = false
          break
        case 65:
          this.leftPressed = false
          break
        default:
          break
      }
    }
  },
  mounted () {
    let canvas = this.$refs.canvas
    canvas.height = this.$el.clientHeight - 36
    canvas.width = this.$el.clientWidth

    document.addEventListener('keydown', this.keyDownHandler, false)
    document.addEventListener('keyup', this.keyUpHandler, false)

    this.resetGame()
  },
  props: [
    'gamePaused',
    'resetSignal',
    'sendSignal'
  ],
  watch: {
    gamePaused (val) {
      if (val === true) {
        this.pauseGame()
      } else {
        this.startGame()
      }
    },
    resetSignal (val) {
      if (val === true) {
        this.resetGame()
        this.sendSignal()
      }
    }
  }
}
</script>
