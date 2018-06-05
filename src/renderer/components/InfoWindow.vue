<template>
  <v-card raised>
    <v-card-text>
      <span class="subheading">Score</span>
      <div>
        <span class="body-2">Points</span>
        <span class="body-1" style="float: right;">{{ currentScore }}</span>
      </div>
    </v-card-text>
    <v-card-text>
      <span class="subheading">Help</span>
      <div v-for="(item, i) in help" :key="i">
        <span class="body-2">{{ item.key }}</span>
        <span class="body-1" style="float: right;">{{ item.description }}</span>
      </div>
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
import { mapGetters } from 'vuex'

export default {
  name: 'info-window',
  computed: {
    ...mapGetters([
      'currentScore'
    ])
  },
  data () {
    return {
      help: [
        { key: 'A/Left-Arrow', description: 'Move left' },
        { key: 'D/Right-Arrow', description: 'Move right' },
        { key: 'Escape', description: 'Reset' },
        { key: 'Spacebar', description: 'Pause/Resume' }
      ]
    }
  },
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

