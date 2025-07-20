<template>
  <div class="node" :class="{ selected: data.selected }" :style="nodeStyles()" data-testid="node">
    <div class="title" data-testid="title">
      <el-popover placement="top" :title="`名称：${data.meta.name}`" width="200" trigger="click"
        :content="`描述：${data.meta.description}`">
        <span slot="reference" style="color: grey" @pointerdown.stop><i class="el-icon-question"></i></span>
      </el-popover>
      <span style="font-weight: bold">{{
        data.meta.displayName || data.meta.name
      }}</span>
      <span v-if="data.meta.category !== 'CONTROL' && data.meta.executable" style="color: grey" @pointerdown.stop
        @click="changeHasExec">
        <i class="el-icon-refresh"></i>
      </span>
    </div>
    <div class="columns">
      <div class="column">
        <!-- Inputs-->
        <div class="input" v-for="[key, input] in inputs()" :key="key + seed" :data-testid="'input-' + key">
          <template v-if="shouldRenderInput(input)">
            <Ref class="input-socket" :emit="emit" :data="{
              type: 'socket',
              side: 'input',
              key: key,
              nodeId: data.id,
              payload: input.socket,
            }" data-testid="input-socket" />
            <el-tooltip effect="light" :content="pinTypeTooltip(input)" placement="top"
              :disabled="!pinTypeTooltip(input)">
              <div class="input-title" data-testid="input-title">
                {{ input.label }}
              </div>
            </el-tooltip>
            <Ref class="input-control" v-show="input.control && input.showControl" :emit="emit"
              :data="{ type: 'control', payload: input.control }" data-testid="input-control" />
          </template>
        </div>
      </div>
      <div class="column">
        <!-- Outputs-->
        <div class="output" v-for="[key, output] in outputs()" :key="key + seed" :data-testid="'output-' + key">
          <template v-if="shouldRenderOutput(output)">
            <!-- Output上不设置controls -->
            <!-- <Ref class="output-control" v-show="output.control && output.showControl" :emit="emit"
              :data="{ type: 'control', payload: output.control }" data-testid="output-control" /> -->
            <el-tooltip effect="light" :content="pinTypeTooltip(output)" placement="top"
              :disabled="!pinTypeTooltip(output)">
              <div class="output-title" data-testid="output-title">
                {{ output.label }}
              </div>
            </el-tooltip>
            <Ref class="output-socket" :emit="emit" :data="{
              type: 'socket',
              side: 'output',
              key: key,
              nodeId: data.id,
              payload: output.socket,
            }" data-testid="output-socket" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Ref } from "rete-vue-plugin/vue2";
import { mapGetters } from "vuex";

function sortByIndex(entries) {
  entries.sort((a, b) => {
    const ai = (a[1] && a[1].index) || 0;
    const bi = (b[1] && b[1].index) || 0;

    return ai - bi;
  });
  return entries;
}

export default {
  name: "Custom-Node",
  props: ["data", "emit", "seed"],
  components: {
    Ref,
  },
  computed: {
    ...mapGetters(["editor", "area"]),
    shouldRenderInput() {
      return (input) => {
        if (this.data.meta.category === "CONTROL") return true;
        if (input.socket.name === "SocketParam") return true;
        if (this.data.meta.executable && this.data.hasExec) return true;
        return false;
      };
    },
    shouldRenderOutput() {
      return (output) => {
        if (this.data.meta.category === "CONTROL") return true;
        if (output.socket.name === "SocketParam") return true;
        if (this.data.meta.executable && this.data.hasExec) return true;
        return false;
      };
    },
  },
  mounted() { },
  methods: {
    changeHasExec() {
      this.$nextTick(async () => {
        this.$set(this.data, "hasExec", !this.data.hasExec);
        this.editor.getConnections().forEach((conn) => {
          if (conn.source === this.data.id || conn.target === this.data.id) {
            this.$nextTick(async () => {
              await this.editor.removeConnection(conn.id);
            });
          }
        });
        await this.area.update("node", this.data.id);
      });
    },
    removePrefixClassName(className) {
      return className.split(".").pop();
    },
    pinTypeTooltip(pin) {
      if (pin && pin.meta && pin.meta.type) {
        if (pin.meta.type.list) {
          const List = this.removePrefixClassName(pin.meta.type.qualifiedName);
          const T = this.removePrefixClassName(
            pin.meta.type.generics[0].qualifiedName
          );
          return `${List}<${T}>`;
        } else if (pin.meta.type.map) {
          const Map = this.removePrefixClassName(pin.meta.type.qualifiedName);
          const K = this.removePrefixClassName(
            pin.meta.type.generics[0].qualifiedName
          );
          const V = this.removePrefixClassName(
            pin.meta.type.generics[1].qualifiedName
          );
          return `${Map}<${K}, ${V}>`;
        } else {
          return this.removePrefixClassName(pin.meta.type.qualifiedName);
        }
      }
      return "";
    },
    nodeStyles() {
      return {
        width: Number.isFinite(this.data.width) ? `${this.data.width}px` : "",
        height: Number.isFinite(this.data.height)
          ? `${this.data.height}px`
          : "",
      };
    },
    inputs() {
      return sortByIndex(Object.entries(this.data.inputs));
    },
    controls() {
      return sortByIndex(Object.entries(this.data.controls));
    },
    outputs() {
      return sortByIndex(Object.entries(this.data.outputs));
    },
  },
};
</script>

<style lang="scss" scoped>
@use "sass:math";
@use "@/assets/vars" as *;

.node {
  background: wheat;
  border: 2px solid grey;
  border-radius: 10px;
  cursor: pointer;
  box-sizing: border-box;
  width: $node-width;
  height: auto;
  padding-bottom: 6px;
  position: relative;
  user-select: none;

  &:hover {
    background: wheat;
  }

  &.selected {
    border-color: red;
  }

  .title {
    color: black;
    // font-family: sans-serif;
    font-size: 18px;
    padding: 8px;
  }

  // .output {
  //   text-align: right;
  // }

  // .input {
  //   text-align: left;
  // }

  // .output-socket {
  //   text-align: right;
  //   margin-right: -1px;
  //   display: inline-block;
  // }

  // .input-socket {
  //   text-align: left;
  //   margin-left: -1px;
  //   display: inline-block;
  // }

  // .input-title,
  // .output-title {
  //   vertical-align: middle;
  //   color: white;
  //   display: inline-block;
  //   font-family: sans-serif;
  //   font-size: 14px;
  //   margin: $socket-margin;
  //   line-height: $socket-size;
  // }

  // .input-control {
  //   z-index: 1;
  //   width: calc(100% - #{$socket-size + 2 * $socket-margin});
  //   vertical-align: middle;
  //   display: inline-block;
  // }

  // .control {
  //   padding: $socket-margin math.div($socket-size, 2) + $socket-margin;
  // }

  .output,
  .input {
    display: flex;
    align-items: center;
  }

  .output {
    justify-content: flex-end;
  }

  .title {
    white-space: nowrap;
    // background: radial-gradient(50% 90%, #3f80c39e 0%, transparent 80%);
    font-size: 20px;
    padding: 5px;
    border-radius: 15px 15px 0 0;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .title,
  .input-title,
  .output-title {
    font-family: "Montserrat", sans-serif !important;
    font-weight: 300;
  }

  .input-title,
  .output-title {
    font-size: 12px;
    font-weight: bold;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .input-socket,
  .output-socket {
    position: relative;
    z-index: 5;
  }

  .input-socket {
    margin-left: 5px !important; // -15px;
  }

  .output-socket {
    margin-right: 5px !important; // -15px;
  }

  .input-control {
    overflow: hidden;
    padding: 0px;
    margin-left: 2px;
  }

  .output-control {
    overflow: hidden;
    padding: 0px;
    margin-right: 2px;
  }

  .columns {
    display: flex;

    .column {
      overflow: hidden;
      flex: 1;
      flex-basis: content;
    }
  }
}
</style>
