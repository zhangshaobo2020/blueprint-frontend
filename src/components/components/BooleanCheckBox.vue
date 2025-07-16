<template>
  <el-checkbox @change="onChange" @pointerdown.native.stop v-model="value" true-label="true" false-label="false"
    :disabled="doesInputConnected()" v-show="!doesInputConnected()"></el-checkbox>
</template>

<script>
export default {
  name: "Component-BooleanCheckBox",
  props: ["data"],
  computed: {
    value: {
      get() {
        return this.data.value;
      },
      set() { },
    },
  },
  methods: {
    onChange(val) {
      this.data.onChange(val);
    },
    doesInputConnected() {
      for (const connection of this.data.editor.getConnections()) {
        if (
          connection.target === this.data.nodeId &&
          connection.targetInput === this.data.inputId
        ) {
          return true;
        }
      }
      return false;
    },
  }
}
</script>

<style></style>