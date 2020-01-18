<template>
  <v-app>
    <v-app-bar app color="accent" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Monster slayer Logo"
          class="shrink mr-2"
          contain
          src="@/assets/img/eyes.png"
          transition="scale-transition"
          width="70"
        />
        <h1>Monster Slayer</h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      ></v-btn>
    </v-app-bar>

    <v-content class="theme-container">
      <Game />
    </v-content>
  </v-app>
</template>

<script>
import Game from "./views/Game"

export default {
  name: "App",

  components: {
    Game
  },

  data: () => ({})
}
</script>

<style lang="scss">
@import "@/assets/style/theme.scss";

body {
  font-family: $FONT_FAMILY;
  color: white;
}

.theme-container {
  background-color: $PRIMARY;
  background-image: linear-gradient(0deg, $SECONDARY 0%, $PRIMARY 100%);
}

h1,
h2,
h3 {
  font-family: $FONT_FAMILY_TITLE;
  color: white;
}
</style>
