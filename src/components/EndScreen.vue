<template>
  <div class="game-end-screen">
    <h2>
      {{
        status === gameStatuses.WIN
          ? "You defeated the monster!"
          : "Monster beat you!"
      }}
    </h2>
    <div>
      <img
        v-if="status === gameStatuses.WIN"
        src="@/assets/img/monster-defeated.svg"
        width="80%"
        alt="defeated monster with bandage"
      />
      <img
        v-else
        src="@/assets/img/monster-winner.svg"
        width="80%"
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
