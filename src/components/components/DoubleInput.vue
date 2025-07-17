<template>
  <div>
    <el-input-number style="width: 100px" placeholder="请输入" controls-position="right" @change="onChange"
      @pointerdown.native.stop v-model="value" :disabled="doesInputConnected()" v-show="!doesInputConnected()">
    </el-input-number>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "Component-DoubleInput",
  props: ["data"],
  created() { },
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
  },
};
</script>

<style>
.el-input-number .el-input__inner {
  text-align: left !important;
}
</style>