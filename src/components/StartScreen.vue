<template>
  <div class="start-screen-container">
    <h2>Slay the monster!</h2>
    <img />
    <div>
      <v-img
        alt="Monster smiling"
        src="@/assets/img/monster.png"
        class="start-screen-image shrink"
        contain
        transition="scale-transition"
      />
    </div>
    <br />
    <Button @click="onStartGame">Start game</Button>
  </div>
</template>

<script>
import Button from "@/components/Button"

/** @description Start screen displayed before game iss started. default screen when app is started. */
export default {
  name: "StartScreen",
  props: {
    onStartGame: {
      type: Function,
      required: true
    }
  },
  components: {
    Button
  }
}
</script>

<style lang="scss">
.start-screen-container {
  margin-top: 20vh;
}

.start-screen-image {
  width: 50%;
  margin: auto;
  min-width: 300px;
  max-width: 1200px;
}
</style>
