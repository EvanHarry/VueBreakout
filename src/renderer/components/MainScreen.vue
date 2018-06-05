<template>
  <v-layout>
    <v-flex class="pr-1" d-flex xs3>
      <info-window :game-paused="gamePaused" :pause-game="toggleGamePause" :reset-game="toggleGameReset" />
    </v-flex>
    <v-flex class="pl-1" d-flex xs9>
      <game-window :game-paused="gamePaused" :reset-signal="gameReset" :send-signal="toggleGameReset" />
    </v-flex>
  </v-layout>
</template>

<script>
import GameWindow from './GameWindow'
import InfoWindow from './InfoWindow'

export default {
  name: 'main-screen',
  components: {
    GameWindow,
    InfoWindow
  },
  data () {
    return {
      gamePaused: false,
      gameReset: false
    }
  },
  methods: {
    handleKeyDown (e) {
      switch (e.keyCode) {
        case 32:
          this.toggleGamePause()
          break

        case 27:
          this.toggleGameReset()
          break

        default:
          break
      }
    },
    toggleGamePause () {
      this.gamePaused = !this.gamePaused
    },
    toggleGameReset () {
      this.gameReset = !this.gameReset
    }
  },
  mounted () {
    document.addEventListener('keydown', this.handleKeyDown, false)
  },
  watch: {
    gameReset (val) {
      if (val === true) {
        this.gamePaused = false
        this.$store.commit('RESET_CURRENT_SCORE')
      }
    }
  }
}
</script>
