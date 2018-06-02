<template>
  <v-card raised>
    <v-card-text>
      <span class="subheading">Score</span>
      <br />
      <span class="body-2">{{ $store.state.score.current }}</span>
    </v-card-text>
    <v-card-actions style="bottom: 0px; position: absolute; width: 100%;">
      <v-btn block color="primary" depressed @click="pauseGame">
        {{ gamePaused ? 'Resume' : 'Pause' }}
      </v-btn>
      <v-btn block color="error" depressed @click="reset">Reset</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'info-window',
  methods: {
    reset () {
      this.resetGame()
    }
  },
  props: [
    'gamePaused',
    'pauseGame',
    'resetGame'
  ]
}
</script>

