<template>
  <v-container class="mb-6">
    <v-row align="middle" no-gutters style="height: auto;">
      <v-col id="player">
        <h1>Your hero</h1>
        <HealthBar :value="playerHealth"></HealthBar>
      </v-col>
      <v-col id="battlefield">
        <Button>Start game</Button>
      </v-col>
      <v-col id="monster">
        <h1>Monster</h1>
        <HealthBar :value="monsterHealth"></HealthBar>
      </v-col>
    </v-row>
  </v-container>
</template>

  <!--<v-container>
    <v-layout text-center wrap>
      <v-flex xs12>
        <HealthBar :value="playerHealth"></HealthBar>
        <HealthBar :value="monsterHealth"></HealthBar>
        <v-img :src="require('../assets/logo.svg')" class="my-3" contain height="200"></v-img>
      </v-flex>

      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">Welcome to Vuetify</h1>
        <p class="subheading font-weight-regular">bla</p>
      </v-flex>

      <v-flex mb-5 xs12>
        <h2 class="headline font-weight-bold mb-3">What's next?</h2>

        <v-layout justify-center></v-layout>
      </v-flex>

      <v-flex xs12 mb-5>
        <h2 class="headline font-weight-bold mb-3">Important Links</h2>

        <v-layout justify-center></v-layout>
      </v-flex>

      <v-flex xs12 mb-5>
        <h2 class="headline font-weight-bold mb-3">Ecosystem</h2>

        <v-layout justify-center></v-layout>
      </v-flex>
    </v-layout>
  </v-container>-->


<script>
import HealthBar from "@/components/HealthBar";
import Button from "@/components/Button";

export default {
  name: "MonsterSlayer",

  data: () => ({
    playerHealth: 100,
    monsterHealth: 50,
    gameIsRunning: false
  }),

  components: {
    HealthBar,
    Button
  }
};
</script>


<style lang="scss" scoped>
#battlefield {
  text-align: center;
}
</style>