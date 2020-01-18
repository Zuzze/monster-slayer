<template>
  <div>
    <HealthBar :value="health"></HealthBar>

    <div class="monster-container">
      <img
        class="monster"
        :src="monsterImage"
        :class="status"
        alt="cute red monster"
      />
      <img
        v-show="status !== gameStatuses.ATTACK"
        class="feet"
        src="@/assets/img/feet.svg"
        alt="cute red monster"
      />
    </div>
  </div>
</template>

<script>
/** @description animated monster and monster health bar */
import { GAME_STATUSES } from "@/assets/data/game-statuses"
import HealthBar from "@/components/HealthBar"

export default {
  name: "Monster",
  data: function() {
    return { gameStatuses: GAME_STATUSES }
  },
  props: {
    health: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      required: true
    }
  },

  computed: {
    monsterImage: function() {
      if (this.status === GAME_STATUSES.ATTACK) {
        return require("@/assets/img/monster-attack.svg")
      }
      return require("@/assets/img/monster.svg")
    }
  },
  components: {
    HealthBar
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/animations.scss";

.monster-container {
  position: relative;
  top: 0;
  left: 0;
  width: 1000px;

  .monster {
    position: relative;
    top: 0;
    left: 10vw;
    z-index: 2;
    animation: walk 2s linear infinite;
    -webkit-animation: walk 2s linear infinite;
    width: 50%;
    margin-top: 12vh;
    transition: 1s;
  }
  .feet {
    position: absolute;
    margin: auto;
    left: 30vw;
    top: 100px;
    animation: walk 0.8s linear infinite;
    -webkit-animation: walk 0.8s linear infinite;
    width: 50%;
  }
}

@media screen and (max-width: 1024px) {
  .monster,
  .feet {
    margin-top: 20vh;
    width: 80%;
  }
}
</style>
