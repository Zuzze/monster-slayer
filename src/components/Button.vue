<template>
  <button class="btn btn-grad">
    <slot></slot>
  </button>
</template>

<script>
/** @description gradient button */
export default {
  name: "Button"
};
</script>


<style lang="scss" scoped>
@import "@/assets/style/theme.scss";

/* remove default blue line on chrome */
button.btn-grad:focus {
  outline: 0;
}

button.btn-grad {
  padding: $BUTTON_PADDING;
  color: $BUTTON_COLOR;
  text-transform: $BUTTON_TEXT_TRANSFORM;
  letter-spacing: $BUTTON_LETTER_SPACING;
  border-radius: $BUTTON_BORDER_RADIUS;
  background: $BUTTON_BG_COLOR_1;
  background-image: linear-gradient(
    to right,
    $BUTTON_BG_COLOR_1 0%,
    $BUTTON_BG_COLOR_2 51%,
    $BUTTON_BG_COLOR_1 100%
  );
  &:hover {
    background-position: right center;
  }
}
</style>