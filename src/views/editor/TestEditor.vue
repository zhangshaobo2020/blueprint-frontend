<template>
  <div>
    <el-button @click="testPure">测试Pure</el-button>
    <el-button @click="testPure2">测试Pure2</el-button>
    <el-button @click="testExec">测试Exec</el-button>
    <el-button @click="testExec2">测试泛型</el-button>
    <el-button @click="test3">测试自定义类型</el-button>
    <el-button @click="test4">反转列表</el-button>
    <div ref="TestEditor" style="width: 100%; height: 90vh"></div>
    <div v-if="editor">{{ editor.getConnections() }}</div>
  </div>
</template>

<script>
import { preSetupEditor, customNode } from "@/core/Editor";

export default {
  name: "TestEditor",
  data() {
    return {
      editor: undefined,
      area: undefined,
    };
  },
  async created() {
  },
  async mounted() {
    const { editor, area } = await preSetupEditor(this.$refs.TestEditor);
    this.editor = editor;
    this.area = area;
  },
  methods: {
    async testPure() {
      const node = customNode("MathLibrary.TestAddAndMultiple", this.editor, this.area);
      await this.editor.addNode(node);
    },
    async testPure2() {
      const node = customNode("MathLibrary.IntegerMultiple", this.editor, this.area);
      await this.editor.addNode(node);
    },
    async testExec() {
      const node = customNode("Control.IfElse", this.editor, this.area);
      await this.editor.addNode(node);
    },
    async testExec2() {
      const node = customNode("MathLibrary.TestAddList", this.editor, this.area);
      await this.editor.addNode(node);
    },
    async test3() {
      const node = customNode("MathLibrary.TestComplexType", this.editor, this.area);
      await this.editor.addNode(node);
    },
    async test4() {
      const node = customNode("MathLibrary.TestReverseList", this.editor, this.area);
      await this.editor.addNode(node);
    },
  },
};
</script>

<style></style>