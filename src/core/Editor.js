import { NodeEditor } from "rete";
import { AreaPlugin, AreaExtensions } from "rete-area-plugin";
import {
    ConnectionPlugin,
    Presets as ConnectionPresets,
} from "rete-connection-plugin";
import { VuePlugin, Presets } from "rete-vue-plugin/vue2";

import { TextInputControl, TextInput } from "@/components/controls/TextInputControl"
import { NumberInputControl, NumberInput } from "@/components/controls/NumberInputControl"

import CustomNode from "@/components/graph/CustomNode.vue"
import SocketExec from "@/components/graph/SocketExec.vue";
import SocketParam from "@/components/graph/SocketParam.vue";
import ConnectionPath from "@/components/graph/ConnectionPath.vue";

import store from '@/store'
import { Node, Input, Output, Socket } from "@/core/Types"

import "@/assets/background.css";

const socket_exec = new Socket("SocketExec");
const socket_param = new Socket("SocketParam");

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
                    if (context.payload instanceof TextInputControl) {
                        return TextInput;
                    }
                    if (context.payload instanceof NumberInputControl) {
                        return NumberInput;
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

/**
 * 根据FunctionDefinition构造节点
 */
function customNode(qualifiedName, editor) {
    if (qualifiedName.startsWith("ControlFlow")) {
        return createControlFlowNode(qualifiedName, editor)
    } else {
        const def = store.getters.findFunctionDefinition(qualifiedName);
        if (def.executable) {
            return createExecNode(qualifiedName, editor)
        }
        return createPureNode(qualifiedName, editor)
    }
}

function createControlFlowNode(qualifiedName, editor) {
    const def = store.getters.findControlFlowDefinition(qualifiedName);
    // 创建节点
    const node = new Node(qualifiedName, def);
    // 执行引脚
    for (let i = 0; i < def.inputs.length; i++) {
        const param = def.inputs[i];
        const exec_input = new Input(socket_exec, param.name);
        node.addInput(exec_input.id, exec_input);
    }
    for (let i = 0; i < def.outputs.length; i++) {
        const param = def.outputs[i];
        const exec_output = new Input(socket_exec, param.name);
        node.addOutput(exec_output.id, exec_output);
    }
    // 数据引脚
    console.log(editor);
    return node;
}

function createExecNode(qualifiedName, editor) {
    const def = store.getters.findFunctionDefinition(qualifiedName);
    // 创建节点
    const node = new Node(qualifiedName, def);
    // 执行引脚
    const exec_input = new Input(socket_exec);
    node.addInput(exec_input.id, exec_input);
    const exec_output = new Output(socket_exec);
    node.addOutput(exec_output.id, exec_output);

    for (let i = 0; i < def.params.length; i++) {
        const param = def.params[i];
        if (param.input) {
            // 创建输入引脚
            const data_input = new Input(socket_param, param.name);
            // 创建输入控制
            if (param.type.qualifiedName === "java.lang.Integer") {
                const control_data_input = new NumberInputControl({
                    value: 0,
                    onChange: function (value) {
                        this.value = value;
                    },
                    editor,
                    nodeId: node.id,
                    inputId: data_input.id
                });
                data_input.addControl(control_data_input);
            }
            node.addInput(data_input.id, data_input);
        } else {
            // 创建输出引脚
            const data_output = new Output(socket_param, param.name);
            node.addOutput(data_output.id, data_output);
        }
    }
    return node;
}

function createPureNode(qualifiedName, editor) {
    const def = store.getters.findFunctionDefinition(qualifiedName);
    // 创建节点
    const node = new Node(qualifiedName, def);
    for (let i = 0; i < def.params.length; i++) {
        const param = def.params[i];
        if (param.input) {
            // 创建输入引脚
            const data_input = new Input(socket_param, param.name);
            // 创建输入控制
            if (param.type.qualifiedName === "java.lang.Integer") {
                const control_data_input = new NumberInputControl({
                    value: 0,
                    onChange: function (value) {
                        this.value = value;
                    },
                    editor,
                    nodeId: node.id,
                    inputId: data_input.id
                });
                data_input.addControl(control_data_input);
            }
            node.addInput(data_input.id, data_input);
        } else {
            // 创建输出引脚
            const data_output = new Output(socket_param, param.name);
            node.addOutput(data_output.id, data_output);
        }
    }
    return node;
}

export {
    setupEditor,
    initializeDefinition,
    customNode
}