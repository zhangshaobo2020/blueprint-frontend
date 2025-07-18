<template>
  <div>
    <el-button type="primary" @click="showJson">JSON</el-button>
    <div ref="TestEditor" style="width: 100%; height: 90vh"></div>
  </div>
</template>

<script>
import { preSetupEditor } from "@/core/Editor";
import { mapGetters } from "vuex";

export default {
  name: "TestEditor",
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(["editor", "area"]),
  },
  async mounted() {
    await preSetupEditor(this.$refs.TestEditor);
  },
  methods: {
    showJson() {
      const json1 = this.editor.getNodes();
      const json2 = this.editor.getConnections();

      console.log(JSON.stringify(json1, null, 2));
      console.log("============================");
      console.log(JSON.stringify(json2, null, 2));
    },
  },
};
</script>

<style></style>