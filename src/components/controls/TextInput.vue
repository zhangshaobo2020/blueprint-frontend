<template>
  <el-input @input="data.onInput" @pointerdown.native.stop v-model="value">
  </el-input>
</template>

<script>
export default {
  name: "Componenet-TextInput",
  props: ["data"],
  computed: {
    value: {
      get() {
        return this.data.value;
      },
      set() {},
    },
  },
};
</script>

<style>
</style>