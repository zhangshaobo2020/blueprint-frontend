import { NodeEditor } from "rete";
import { AreaPlugin, AreaExtensions } from "rete-area-plugin";
import {
    ConnectionPlugin,
    Presets as ConnectionPresets,
} from "rete-connection-plugin";
import { VuePlugin, Presets } from "rete-vue-plugin/vue2";

import { StringInputControl, StringInput } from "@/components/controls/StringInputControl"
import { FloatInputControl, FloatInput } from "@/components/controls/FloatInputControl"
import { DoubleInputControl, DoubleInput } from "@/components/controls/DoubleInputControl"
import { IntegerInputControl, IntegerInput } from "@/components/controls/IntegerInputControl"
import { LongInputControl, LongInput } from "@/components/controls/LongInputControl"
import { BooleanCheckBoxControl, BooleanCheckBox } from "@/components/controls/BooleanCheckBoxControl"

import CustomNode from "@/components/graph/CustomNode.vue"
import SocketExec from "@/components/graph/SocketExec.vue";
import SocketParam from "@/components/graph/SocketParam.vue";
import ConnectionPath from "@/components/graph/ConnectionPath.vue";

import store from '@/store'
import { Node, Input, Output, Socket } from "@/core/Types"

import "@/assets/background.css";

const socket_exec = new Socket("SocketExec", "#ffffff");
// const socket_param = new Socket("SocketParam", "#ffffff");
// const socket_param_byte = new Socket("SocketParam", "#C9D400");
// const socket_param_short = new Socket("SocketParam", "#B5D334");
const socket_param_integer = new Socket("SocketParam", "#B8B42D");
const socket_param_long = new Socket("SocketParam", "#A99F00");

const socket_param_float = new Socket("SocketParam", "#3DB8B8");
const socket_param_double = new Socket("SocketParam", "#40E0D0");
const socket_param_boolean = new Socket("SocketParam", "#EF476F");
// const socket_param_character = new Socket("SocketParam", "#FF69B4");

// const socket_param_string = new Socket("SocketParam", "#CD5CFF");
// const socket_param_bigdecimal = new Socket("SocketParam", "#2EBFA5");
// const socket_param_date = new Socket("SocketParam", "#1E90FF");
// const socket_param_localdatetime = new Socket("SocketParam", "#4169E1");

/**
 * 构造默认Editor
 */
function setupEditor(container) {

    const editor = new NodeEditor();
    const area = new AreaPlugin(container);
    const connection = new ConnectionPlugin();
    const render = new VuePlugin();

    AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
        accumulating: AreaExtensions.accumulateOnCtrl(),
    });

    // render.addPreset(Presets.classic.setup());
    render.addPreset(
        Presets.classic.setup({
            customize: {
                node() {
                    return CustomNode;
                },
                connection() {
                    return ConnectionPath;
                },
                socket(context) {
                    if (context.payload.name === "SocketExec") {
                        return SocketExec;
                    }
                    if (context.payload.name === "SocketParam") {
                        return SocketParam;
                    }
                    return Presets.classic.Socket;
                },
                control(context) {
                    if (context.payload instanceof StringInputControl) {
                        return StringInput;
                    }
                    if (context.payload instanceof IntegerInputControl) {
                        return IntegerInput;
                    }
                    if (context.payload instanceof LongInputControl) {
                        return LongInput;
                    }
                    if (context.payload instanceof FloatInputControl) {
                        return FloatInput;
                    }
                    if (context.payload instanceof DoubleInputControl) {
                        return DoubleInput;
                    }
                    if (context.payload instanceof BooleanCheckBoxControl) {
                        return BooleanCheckBox;
                    }
                }
            }
        })
    );

    connection.addPreset(ConnectionPresets.classic.setup());

    editor.use(area);
    area.use(connection);
    area.use(render);

    const background = document.createElement("div");

    background.classList.add("background");
    background.classList.add("fill-area");

    area.area.content.add(background);

    AreaExtensions.simpleNodesOrder(area);
    // 阻止area进行默认缩放
    area.addPipe(context => {
        if (context.type === 'zoom' && context.data.source === 'dblclick') return
        return context
    })
    return { editor, area };
}

/**
 * TODO: 初始化type和function
 */
function initializeDefinition() {
}

function buildInputOutputControl(editor, node, param) {
    if (param.input) {
        // 创建输入引脚、控制
        if (param.type.qualifiedName === "java.lang.Integer") {
            const param_input = new Input(socket_param_integer, param.name);
            node.addInput(param_input.id, param_input);
            const control_param_input = new IntegerInputControl({
                value: 0,
                onChange: function (value) {
                    this.value = value;
                },
                editor,
                nodeId: node.id,
                inputId: param_input.id
            });
            param_input.addControl(control_param_input);
        }
        if (param.type.qualifiedName === "java.lang.Long") {
            const param_input = new Input(socket_param_long, param.name);
            node.addInput(param_input.id, param_input);
            const control_param_input = new LongInputControl({
                value: 0,
                onChange: function (value) {
                    this.value = value;
                },
                editor,
                nodeId: node.id,
                inputId: param_input.id
            });
            param_input.addControl(control_param_input);
        }
        if (param.type.qualifiedName === "java.lang.Float") {
            const param_input = new Input(socket_param_float, param.name);
            node.addInput(param_input.id, param_input);
            const control_param_input = new FloatInputControl({
                value: 0,
                onChange: function (value) {
                    this.value = value;
                },
                editor,
                nodeId: node.id,
                inputId: param_input.id
            });
            param_input.addControl(control_param_input);
        }
        if (param.type.qualifiedName === "java.lang.Double") {
            const param_input = new Input(socket_param_double, param.name);
            node.addInput(param_input.id, param_input);
            const control_param_input = new DoubleInputControl({
                value: 0,
                onChange: function (value) {
                    this.value = value;
                },
                editor,
                nodeId: node.id,
                inputId: param_input.id
            });
            param_input.addControl(control_param_input);
        }
        if (param.type.qualifiedName === "java.lang.Boolean") {
            const param_input = new Input(socket_param_boolean, param.name);
            node.addInput(param_input.id, param_input);
            const control_param_input = new BooleanCheckBoxControl({
                value: false,
                onChange: function (value) {
                    this.value = value;
                },
                editor,
                nodeId: node.id,
                inputId: param_input.id
            });
            param_input.addControl(control_param_input);
        }
    } else {
        // 创建输出引脚
        if (param.type.qualifiedName === "java.lang.Integer") {
            const data_output = new Output(socket_param_integer, param.name);
            node.addOutput(data_output.id, data_output);
        }
        if (param.type.qualifiedName === "java.lang.Long") {
            const data_output = new Output(socket_param_long, param.name);
            node.addOutput(data_output.id, data_output);
        }
        if (param.type.qualifiedName === "java.lang.Float") {
            const data_output = new Output(socket_param_float, param.name);
            node.addOutput(data_output.id, data_output);
        }
        if (param.type.qualifiedName === "java.lang.Double") {
            const data_output = new Output(socket_param_double, param.name);
            node.addOutput(data_output.id, data_output);
        }
        if (param.type.qualifiedName === "java.lang.Boolean") {
            const data_output = new Output(socket_param_boolean, param.name);
            node.addOutput(data_output.id, data_output);
        }
    }
}

/**
 * 根据FunctionDefinition构造节点
 */
function customNode(qualifiedName, editor) {
    if (qualifiedName.startsWith("Control.")) {
        return createControlNode(qualifiedName, editor)
    } else {
        const def = store.getters.findFunctionDef(qualifiedName);
        if (def.executable) {
            return createExecNode(qualifiedName, editor)
        }
        return createPureNode(qualifiedName, editor)
    }
}

function createControlNode(qualifiedName, editor) {
    const def = store.getters.findControlDef(qualifiedName);
    // 创建节点
    const node = new Node(qualifiedName, def);
    // 执行引脚
    for (let i = 0; i < def.execPins.length; i++) {
        const param = def.execPins[i];
        if (param.input) {
            // 创建输入引脚
            const exec_input = new Input(socket_exec, param.name);
            node.addInput(exec_input.id, exec_input);
        } else {
            // 创建输出引脚
            const exec_output = new Output(socket_exec, param.name);
            node.addOutput(exec_output.id, exec_output);
        }
    }
    // 数据引脚
    for (let i = 0; i < def.paramPins.length; i++) {
        const param = def.paramPins[i].paramDef;
        buildInputOutputControl(editor, node, param)
    }
    return node;
}

function createExecNode(qualifiedName, editor) {
    const def = store.getters.findFunctionDef(qualifiedName);
    // 创建节点
    const node = new Node(qualifiedName, def);
    // 执行引脚
    const exec_input = new Input(socket_exec);
    node.addInput(exec_input.id, exec_input);
    const exec_output = new Output(socket_exec);
    node.addOutput(exec_output.id, exec_output);

    for (let i = 0; i < def.params.length; i++) {
        const param = def.params[i];
        buildInputOutputControl(editor, node, param)
    }
    return node;
}

function createPureNode(qualifiedName, editor) {
    const def = store.getters.findFunctionDef(qualifiedName);
    // 创建节点
    const node = new Node(qualifiedName, def);
    for (let i = 0; i < def.params.length; i++) {
        const param = def.params[i];
        buildInputOutputControl(editor, node, param)
    }
    return node;
}

export {
    setupEditor,
    initializeDefinition,
    customNode
}