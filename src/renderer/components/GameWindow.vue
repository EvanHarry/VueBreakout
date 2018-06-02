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
      x: 0,
      y: 0,
      yFactor: 2,
      xFactor: 2,
      ballRadius: 10,
      ballColour: '#2196F3',
      instance: null
    }
  },
  methods: {
    drawBall () {
      this.ctx.beginPath()
      this.ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2)
      this.ctx.fillStyle = this.ballColour
      this.ctx.fill()
      this.ctx.closePath()
    },
    update () {
      this.ctx.clearRect(0, 0, this.maxWidth, this.maxHeight)

      this.drawBall()

      if (this.y <= 0 + this.ballRadius) {
        this.yFactor = 2
        this.$store.commit('score/INCREASE_CURRENT_SCORE')
      } else if (this.y >= this.maxHeight - this.ballRadius) {
        this.yFactor = -2
        this.$store.commit('score/INCREASE_CURRENT_SCORE')
      }

      if (this.x <= 0 + this.ballRadius) {
        this.xFactor = 2
        this.$store.commit('score/INCREASE_CURRENT_SCORE')
      } else if (this.x >= this.maxWidth - this.ballRadius) {
        this.xFactor = -2
        this.$store.commit('score/INCREASE_CURRENT_SCORE')
      }

      this.y += this.yFactor
      this.x += this.xFactor
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
      this.x = canvas.width / 2
      this.y = canvas.height / 2

      this.xFactor = 2
      this.yFactor = 2

      this.startGame()
    }
  },
  mounted () {
    let canvas = this.$refs.canvas
    canvas.height = this.$el.clientHeight - 36
    canvas.width = this.$el.clientWidth

    this.x = canvas.width / 2
    this.y = canvas.height / 2

    this.startGame()
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
