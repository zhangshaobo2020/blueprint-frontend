<template>
  <div>
    <el-button @click="testPure">测试Pure</el-button>
    <el-button @click="testExec">测试Exce</el-button>
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
    const { data: controlFlowDef } = await GlobalApi.controlFlowDefinition();
    this.$store.commit("overrideControlFlowDefinition", controlFlowDef);
    const { data: typeDef } = await GlobalApi.typeDefinition();
    this.$store.commit("overrideTypeDefinition", typeDef);
    const { data: functionDef } = await GlobalApi.functionDefinition();
    this.$store.commit("overrideFunctionDefinition", functionDef);
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
      const node = customNode("ControlFlow.IfElse", this.editor);
      await this.editor.addNode(node);
    },
  },
};
</script>

<style>
</style>