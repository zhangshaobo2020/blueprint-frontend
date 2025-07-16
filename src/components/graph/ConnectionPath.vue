<template>
  <svg data-testid="connection">
    <path :d="path"></path>
  </svg>
</template>

<script>
export default {
  name: "connection-path",
  props: ["data", "start", "end", "path"],
};
</script>

<style lang="scss" scoped>
svg {
  z-index: 999;
  overflow: visible !important;
  position: absolute;
  pointer-events: none;
  width: 9999px;
  height: 9999px;
  path {
    fill: none;
    stroke-width: 3px;
    stroke: blueviolet;
    pointer-events: auto;
  }
}
</style>
