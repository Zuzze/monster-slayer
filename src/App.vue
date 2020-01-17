<template>
  <v-app>
    <v-app-bar app color="accent" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <h1>Monster Slayer</h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text></v-btn>
    </v-app-bar>

    <v-content>
      <Game />
    </v-content>
  </v-app>
</template>

<script>
import Game from "./views/Game";

export default {
  name: "App",

  components: {
    Game
  },

  data: () => ({})
};
</script>

<style scoped>
body {
  background-color: #08aeea;
  background-image: linear-gradient(0deg, #08aeea 0%, #2af598 100%);
}
</style>