<template>
  <div>
    <el-button @click="testPure">测试Pure</el-button>
    <el-button @click="testExec">测试Exec</el-button>
    <div ref="TestEditor" style="width: 100%; height: 90vh"></div>
    <div v-if="editor">{{ editor.getConnections() }}</div>
  </div>
</template>

<script>
import { setupEditor, initializeDefinition, customNode } from "@/core/Editor";
import * as GlobalApi from "@/api/BlueprintGlobalApi";
export default {
  name: "TestEditor",
  data() {
    return {
      editor: undefined,
      area: undefined,
    };
  },
  async created() {
    const { data: controlDef } = await GlobalApi.controlDefinition();
    this.$store.commit("overrideControlDef", controlDef);
    const { data: typeDef } = await GlobalApi.typeDefinition();
    this.$store.commit("overrideTypeDef", typeDef);
    const { data: functionDef } = await GlobalApi.functionDefinition();
    this.$store.commit("overrideFunctionDef", functionDef);
    initializeDefinition();
  },
  mounted() {
    const { editor, area } = setupEditor(this.$refs.TestEditor);
    this.editor = editor;
    this.area = area;
  },
  methods: {
    async testPure() {
      const node = customNode("MathLibrary.TestAddAndMultiple", this.editor);
      await this.editor.addNode(node);
    },
    async testExec() {
      const node = customNode("Control.IfElse", this.editor);
      await this.editor.addNode(node);
    },
  },
};
</script>

<style></style>