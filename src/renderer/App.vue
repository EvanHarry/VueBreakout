<template>
  <div id="app">
    <v-app dark>
      <v-toolbar app color="pink darken-3" dense fixed>
        <v-toolbar-title v-text="title" />
        <v-spacer />
        <v-btn icon @click="minimize">
          <v-icon>remove</v-icon>
        </v-btn>
        <v-btn icon @click="exit">
          <v-icon>clear</v-icon>
        </v-btn>
      </v-toolbar>
      <v-content>
        <v-container fluid fill-height>
          <router-view />
        </v-container>
      </v-content>
      <v-footer app color="secondary" fixed>
        <v-spacer />
        <div>Made with &hearts; by Evan Harry</div>
        <v-spacer />
      </v-footer>
    </v-app>
  </div>
</template>

<script>
  export default {
    name: 'vue-pong',
    data () {
      return {
        title: 'Pong'
      }
    },
    methods: {
      minimize () {
        const remote = require('electron').remote
        let window = remote.getCurrentWindow()
        window.minimize()
      },
      exit () {
        const remote = require('electron').remote
        let window = remote.getCurrentWindow()
        window.close()
      }
    }
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');

html {
  overflow: hidden;
}
</style>
