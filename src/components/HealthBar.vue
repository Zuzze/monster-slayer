<template>
  <div class="health-bar">
    <div
      class="health-bar__value"
      :class="{ full: value === 100 }"
      :style="{ width: healthBarWidth }"
    >
      {{ value }}
    </div>
  </div>
</template>

<script>
/** @description healthbar showing the health of player or monster */
export default {
  name: "Healthbar",
  props: ["value"],
  computed: {
    healthBarWidth: function() {
      return this.value + "%"
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/theme.scss";

.health-bar {
  margin: 1em 0;
  width: 100%;
  height: $BAR_HEIGHT;
  text-align: center;
  border-radius: $BAR_BORDER_RADIUS;
  background-color: $EMPTY_BG_COLOR_1;
  background-image: radial-gradient(
    circle 343px at 46.3% 47.5%,
    $EMPTY_BG_COLOR_1 0%,
    $EMPTY_BG_COLOR_2 72.9%
  );
}

.health-bar__value {
  height: $BAR_HEIGHT;
  border-radius: 40px 0 0 40px;
  font-size: 0.8em;
  background-color: $HEALTH_BG_COLOR_1;
  background-image: linear-gradient(
    45deg,
    $HEALTH_BG_COLOR_2 0%,
    $HEALTH_BG_COLOR_1 100%
  );
  transition: 0.8s;
  &.full {
    border-radius: $BAR_BORDER_RADIUS;
  }
}
</style>
