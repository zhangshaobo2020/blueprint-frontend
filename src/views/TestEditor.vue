<template>
  <div>
    <div ref="TestEditor" style="width: 100%; height: 90vh"></div>
  </div>
</template>

<script>
import { preSetupEditor } from "@/core/Editor";

export default {
  name: "TestEditor",
  data() {
    return {
    };
  },
  async created() {
  },
  async mounted() {
    await preSetupEditor(this.$refs.TestEditor);
  },
  methods: {
  },
};
</script>

<style></style>