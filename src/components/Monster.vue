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

$MONSTER_WIDTH: 600;

.monster-container {
  position: relative;
  top: 0;
  text-align: center;
  width: 70vw;
  margin: auto;

  .monster,
  .feet {
    position: absolute;
    top: 10vh;
    margin-left: -40%;
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
    /*margin-top: 20vh;
    width: 80%;*/
  }
}
</style>
