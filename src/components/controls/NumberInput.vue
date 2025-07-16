<template>
  <div>
    <el-input-number
      style="width: 100px"
      placeholder="请输入"
      controls-position="right"
      @change="onChange"
      @pointerdown.native.stop
      v-model="value"
      :disabled="doesInputConnected()"
      v-show="!doesInputConnected()"
    >
    </el-input-number>
  </div>
</template>

<script>
export default {
  name: "Componenet-NumberInput",
  props: ["data"],
  created() {},
  computed: {
    value: {
      get() {
        return this.data.value;
      },
      set() {},
    },
  },
  methods: {
    onChange(val) {
      this.data.onChange(val);
    },
    doesInputConnected() {
      for (const connection of this.data.editor.getConnections()) {
        console.log("==============================");
        console.log(this.data.nodeId, this.data.inputId);
        console.log(connection.target, connection.targetInput);
        console.log("==============================");
        if (
          connection.target === this.data.nodeId &&
          connection.targetInput === this.data.inputId
        ) {
          console.log(this.data.nodeId, this.data.inputId, true);
          return true;
        }
      }
      // console.log(this.data.nodeId, this.data.inputId, false);
      return false;
      // this.data.editor.getConnections().forEach((connection) => {
      //   if (
      //     connection.target === this.data.nodeId &&
      //     connection.targetInput === this.data.inputId
      //   )
      //     console.log(this.data.nodeId, this.data.inputId, true);
      //   return true;
      // });
      // console.log(this.data.nodeId, this.data.inputId, false);
      // return false;
    },
  },
};
</script>

<style>
.el-input-number .el-input__inner {
  text-align: left !important;
}
</style>