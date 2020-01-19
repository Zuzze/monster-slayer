<template>
  <div>
    <div class="monster-health-bar-container">
      <HealthBar class="monster-health-bar" :value="health"></HealthBar>
    </div>

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

.monster-health-bar-container {
  padding-top: 70px;
}

.monster-container {
  position: relative;
  top: 0;
  text-align: center;
  width: 50%;
  max-width: 1000px;
  margin: auto;

  .monster,
  .feet {
    position: absolute;
    top: 10vh;
    margin-left: -45%;
  }

  .monster {
    animation: walk 2s linear infinite;
    -webkit-animation: walk 2s linear infinite;
    z-index: 3;
  }
  .feet {
    z-index: 2;
    animation: walk 0.8s linear infinite;
    -webkit-animation: walk 0.8s linear infinite;
  }
}

@media screen and (max-width: 1024px) {
  .monster,
  .feet {
    top: 0;
    width: 150%;
    left: 20%;
    margin-top: -80px;
  }
  .monster-health-bar-container {
    padding-top: 0px;
    padding-bottom: 90px;
  }
}

@media screen and (max-width: 600px) {
  .monster-health-bar-container {
    margin-top: 70px;
    padding-bottom: 80px;
  }
  .monster,
  .feet {
    width: 200%;
    left: 0%;
    top: 15vh;
    margin-top: -60px;
  }
  .monster-health-bar-container {
    padding-top: 0px;
  }
}
</style>
