<template>
  <!-- <div class="socket" :title="data.name"></div> -->
  <div class="socket-exec">
    <svg width="20px" height="20px">
      <path
        d="M3,3 L10,3 L17,10 L10,17 L3,17 Z"
        fill="lightgray"
        stroke="black"
        stroke-width="1"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "socket-exec",
  props: ["data"],
};
</script>

<style lang="scss" scoped>
@use "sass:math";
@use "@/assets/vars" as *;

.socket-exec {
  border-radius: calc($socket-size + $socket-margin * 2) / 2;
  padding: $socket-margin;
  display: inline-flex;
}
.svg {
  stroke: white;
  fill: #ffffff47;
  stroke-width: 1px;
  stroke-linejoin: round;
  :hover {
    stroke-width: 5px;
  }
  width: 20px;
  height: 20px;
}

.socket {
  display: inline-block;
  cursor: pointer;
  width: 0;
  height: 0;
  border-top: calc($socket-size / 2) solid transparent; // 箭头的顶部边框（透明）
  border-bottom: calc($socket-size / 2) solid transparent; // 箭头的底部边框（透明）
  border-left: $socket-size solid pink; // 箭头的左侧边框（实际显示部分）
  vertical-align: middle;
  z-index: 2;

  // margin-left: 5px; /* 左侧空出10px间距 */

  &:hover {
    border-left-color: #ddd; // 箭头悬停时的颜色变化
  }
}
</style>
