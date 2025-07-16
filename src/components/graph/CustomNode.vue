<template>
  <div
    class="node"
    :class="{ selected: data.selected }"
    :style="nodeStyles()"
    data-testid="node"
  >
    <div class="title" data-testid="title">
      <el-tooltip
        class="item"
        effect="dark"
        :content="data.meta.description"
        placement="top"
      >
        <span><i class="el-icon-question"></i></span>
      </el-tooltip>
      <span>{{ data.meta.displayName || data.meta.name }}</span>
    </div>
    <div class="columns">
      <div class="column">
        <!-- Inputs-->
        <div
          class="input"
          v-for="[key, input] in inputs()"
          :key="key + seed"
          :data-testid="'input-' + key"
        >
          <Ref
            class="input-socket"
            :emit="emit"
            :data="{
              type: 'socket',
              side: 'input',
              key: key,
              nodeId: data.id,
              payload: input.socket,
            }"
            data-testid="input-socket"
          />
          <!-- v-show="!input.control || !input.showControl" -->
          <div class="input-title" data-testid="input-title">
            {{ input.label }}
          </div>
          <Ref
            class="input-control"
            v-show="input.control && input.showControl"
            :emit="emit"
            :data="{ type: 'control', payload: input.control }"
            data-testid="input-control"
          />
        </div>
      </div>
      <div class="column">
        <!-- Outputs-->
        <div
          class="output"
          v-for="[key, output] in outputs()"
          :key="key + seed"
          :data-testid="'output-' + key"
        >
          <div class="output-title" data-testid="output-title">
            {{ output.label }}
          </div>
          <Ref
            class="output-socket"
            :emit="emit"
            :data="{
              type: 'socket',
              side: 'output',
              key: key,
              nodeId: data.id,
              payload: output.socket,
            }"
            data-testid="output-socket"
          />
        </div>
      </div>
      <!-- Controls-->
      <Ref
        class="control"
        v-for="[key, control] in controls()"
        :key="key + seed"
        :emit="emit"
        :data="{ type: 'control', payload: control }"
        :data-testid="'control-' + key"
      />
    </div>
  </div>
</template>

<script>
import { Ref } from "rete-vue-plugin/vue2";

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
  mounted() {},
  methods: {
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
    font-size: 14px;
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
    padding: 2px;
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