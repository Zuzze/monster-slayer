<template>
  <div class="game-end-screen">
    <h2>
      {{
        status === gameStatuses.WIN
          ? "You defeated the monster!"
          : "The Monster beat you!"
      }}
    </h2>
    <div>
      <img
        v-if="status === gameStatuses.WIN"
        src="@/assets/img/monster-defeated.svg"
        width="80%"
        class="game-end-screen__image"
        alt="defeated monster with bandage"
      />
      <img
        v-else
        src="@/assets/img/monster-winner.svg"
        width="80%"
        class="game-end-screen__image"
        alt="monster with sunglasses smiling"
      />
    </div>
    <Button @click="onStartNewGame">New game</Button>
  </div>
</template>

<script>
import { GAME_STATUSES } from "@/assets/data/game-statuses"
import Button from "@/components/Button"

/** @description Game over or Winning Screen displayed after game ended */
export default {
  name: "EndScreen",
  data: function() {
    return {
      gameStatuses: GAME_STATUSES
    }
  },

  props: ["status", "onStartNewGame"],
  components: {
    Button
  }
}
</script>

<style lang="scss">
.game-end-screen {
  margin-top: 20vh;
}
.game-end-screen__image {
  max-width: 1000px;
}
</style>
