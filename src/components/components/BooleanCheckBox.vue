<template>
  <el-checkbox @change="onChange" @pointerdown.native.stop v-model="value" true-label="true" false-label="false"
    :disabled="doesInputConnected()" v-show="!doesInputConnected()"></el-checkbox>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "Component-BooleanCheckBox",
  props: ["data"],
  computed: {
    ...mapGetters([
      'editor',
      'area',
    ]),
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
      for (const connection of this.editor.getConnections()) {
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