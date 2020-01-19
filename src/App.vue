<template>
  <v-app>
    <v-app-bar app color="accent" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Monster slayer Logo"
          class="shrink"
          contain
          src="@/assets/img/logo.png"
          transition="scale-transition"
          width="70"
        />
        <h1 class="app-bar-title">Monster Slayer</h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      ></v-btn>
    </v-app-bar>

    <MonsterSlayer></MonsterSlayer>
  </v-app>
</template>

<script>
import MonsterSlayer from "./views/MonsterSlayer"

export default {
  name: "App",

  components: {
    MonsterSlayer
  },

  data: () => ({})
}
</script>

<style lang="scss">
@import "@/assets/style/theme.scss";
@import "@/assets/style/animations.scss";

body {
  font-family: $FONT_FAMILY;
  color: $PRIMARY;
  background-color: $PRIMARY;
  background-image: linear-gradient(0deg, $SECONDARY 0%, $PRIMARY 100%);
}

.app-bar-title {
  width: 80vw;
  font-size: 1.5em;
}

h1,
h2,
h3 {
  font-family: $FONT_FAMILY_TITLE;
  color: white;
}

.fade-in {
  -webkit-animation: fade-in 1s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fade-in 1s; /* Firefox < 16 */
  -ms-animation: fade-in 1s; /* Internet Explorer */
  -o-animation: fade-in 1s; /* Opera < 12.1 */
  animation: fade-in 1s;
}
</style>
