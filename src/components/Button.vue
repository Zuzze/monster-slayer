<template>
  <!-- emit event to parent to keep this component dummy -->
  <button
    :class="{ disabled: disabled }"
    :disabled="disabled"
    @click="$emit('click')"
    class="btn"
  >
    <slot></slot>
  </button>
</template>

<script>
/** @description gradient button */
export default {
  name: "Button",
  props: {
    disabled: {
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/theme.scss";

/* remove default blue line on chrome */
button.btn:focus {
  outline: 0;
}

button.btn {
  padding: $BUTTON_PADDING;
  color: $BUTTON_COLOR;
  text-transform: $BUTTON_TEXT_TRANSFORM;
  letter-spacing: $BUTTON_LETTER_SPACING;
  border-radius: $BUTTON_BORDER_RADIUS;
  background: $BUTTON_BG_COLOR_1;
  margin: 1em 0.5em 0em 0em;
  background-image: linear-gradient(
    to right,
    $BUTTON_BG_COLOR_1 0%,
    $BUTTON_BG_COLOR_2 51%,
    $BUTTON_BG_COLOR_1 100%
  );
  &:hover:not(.disabled) {
    background-position: right center;
    opacity: 0.9;
  }

  &.disabled {
    background: $BUTTON_BG_COLOR--DISABLED_1;
    background-image: linear-gradient(
      to right,
      $BUTTON_BG_COLOR--DISABLED_1 0%,
      $BUTTON_BG_COLOR--DISABLED_2 51%,
      $BUTTON_BG_COLOR--DISABLED_2 100%
    );
  }
}
</style>
