import Vue from "vue";

import { NodeEditor } from "rete";
import { AreaPlugin, AreaExtensions } from "rete-area-plugin";
import {
    ConnectionPlugin,
    Presets as ConnectionPresets,
} from "rete-connection-plugin";
import { VuePlugin, Presets } from "rete-vue-plugin/vue2";

import { ContextMenuPlugin, Presets as ContextMenuPresets } from "rete-context-menu-plugin";

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
import * as GlobalApi from "@/api/BlueprintGlobalApi";

const socket_exec = new Socket("SocketExec", "#ffffff");
// const socket_param = new Socket("SocketParam", "#ffffff");
// const socket_param_byte = new Socket("SocketParam", "#E67E22");
// const socket_param_short = new Socket("SocketParam", "#D35400");
const socket_param_integer = new Socket("SocketParam", "#F1C40F");
const socket_param_long = new Socket("SocketParam", "#B7950B");

const socket_param_float = new Socket("SocketParam", "#1ABC9C");
const socket_param_double = new Socket("SocketParam", "#16A085");
const socket_param_boolean = new Socket("SocketParam", "#E74C3C");
// const socket_param_character = new Socket("SocketParam", "#9B59B6");

const socket_param_string = new Socket("SocketParam", "#8E44AD");
// const socket_param_bigdecimal = new Socket("SocketParam", "#0E6655");
// const socket_param_date = new Socket("SocketParam", "#3498DB");
// const socket_param_localdatetime = new Socket("SocketParam", "#154360");

const socket_param_list = new Socket("SocketParam", "#0040ff");
const socket_param_map = new Socket("SocketParam", "#bb00ff");

async function preSetupEditor(container) {
    const values = await Promise.all([
        GlobalApi.controlDefinition(),
        GlobalApi.typeDefinition(),
        GlobalApi.functionDefinition()
    ])
    store.commit("overrideControlDef", values[0].data);
    store.commit("overrideTypeDef", values[1].data);
    store.commit("overrideFunctionDef", values[2].data);
    setupEditor(container);
}

/**
 * 构造默认Editor
 */
function setupEditor(container) {
    const editor = new NodeEditor();
    const area = new AreaPlugin(container);
    const connection = new ConnectionPlugin();
    // const render = new VuePlugin();
    // 将store注入到VuePlugin中
    const render = new VuePlugin({
        setup(context) {
            return new Vue({ ...context, store });
        },
    });

    const initializeDefinitionContextMenu = initializeDefinition();
    const contextMenu = new ContextMenuPlugin({
        items: ContextMenuPresets.classic.setup(initializeDefinitionContextMenu)
    });

    AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
        accumulating: AreaExtensions.accumulateOnCtrl(),
    });

    render.addPreset(Presets.contextMenu.setup({ delay: 50 }));
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
    // 拦截连接事件
    connection.addPipe(context => {
        if (context.type === "connectioncreate") {
            const { source, sourceOutput, target, targetInput } = context.data
            const source_node = editor.getNode(source);
            const source_output = source_node.outputs[sourceOutput];
            const target_node = editor.getNode(target);
            const target_input = target_node.inputs[targetInput];
            // 判断引脚类型是否一致
            if (source_output.socket.name !== target_input.socket.name) return
            // 判断参数类型是否一致
            if (source_output.socket.name === "SocketParam"
                && target_input.socket.name === "SocketParam") {
                if (source_output.meta.type.qualifiedName
                    !== target_input.meta.type.qualifiedName) return
                if (source_output.meta.type.list
                    && target_input.meta.type.list) {
                    if (source_output.meta.type.generics[0].qualifiedName
                        !== target_input.meta.type.generics[0].qualifiedName) return
                }
                if (source_output.meta.type.map
                    && target_input.meta.type.map) {
                    if ((source_output.meta.type.generics[0].qualifiedName
                        !== target_input.meta.type.generics[0].qualifiedName)
                        || (source_output.meta.type.generics[1].qualifiedName
                            !== target_input.meta.type.generics[1].qualifiedName)) return
                }
            }
        }
        return context
    })

    editor.use(area);
    area.use(connection);
    area.use(render);
    area.use(contextMenu);

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
    // 将editor和area存入store
    store.commit("overrideEditor", editor);
    store.commit("overrideArea", area);
}

function buildNestedStructure(arr) {
    const root = [];

    // 在 children 中查找节点，如果没有则创建
    function findOrCreateNode(children, name) {
        let node = children.find(([n]) => n === name);
        if (!node) {
            node = [name, []];
            children.push(node);
        }
        return node;
    }

    arr.forEach(path => {
        const parts = path.split('.');
        let current = root;

        parts.forEach((part, index) => {
            const isLeaf = index === parts.length - 1;

            if (isLeaf) {
                // 叶子节点绑定 customNode("完整路径")
                current.push([part, () => customNode(path)]);
            } else {
                const node = findOrCreateNode(current, part);
                current = node[1]; // 下钻到子数组
            }
        });
    });

    return root;
}

/**
 * TODO: 初始化type和function
 */
function initializeDefinition() {
    const typeDefs = buildNestedStructure(Object.keys(store.getters.controlDef).map(k => k));
    const functionDefs = buildNestedStructure(Object.keys(store.getters.functionDef).map(k => k));
    const definitions = [...typeDefs, ...functionDefs];
    return definitions;
}

function buildInputOutputControl(node, param) {
    const editor = store.getters.editor;
    if (param.input) {
        // 创建输入引脚、控制
        if (param.type.qualifiedName === "java.lang.Integer") {
            const param_input = new Input(socket_param_integer, param.name, param);
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
            const param_input = new Input(socket_param_long, param.name, param);
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
            const param_input = new Input(socket_param_float, param.name, param);
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
            const param_input = new Input(socket_param_double, param.name, param);
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
            const param_input = new Input(socket_param_boolean, param.name, param);
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
        if (param.type.qualifiedName === "java.lang.String") {
            const param_input = new Input(socket_param_string, param.name, param);
            node.addInput(param_input.id, param_input);
            const control_param_input = new StringInputControl({
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
        if (param.type.qualifiedName === "java.util.List") {
            const param_input = new Input(socket_param_list, param.name, param);
            node.addInput(param_input.id, param_input);
        }
        if (param.type.qualifiedName === "java.util.Map") {
            const param_input = new Input(socket_param_map, param.name, param);
            node.addInput(param_input.id, param_input);
        }
    } else {
        // 创建输出引脚
        if (param.type.qualifiedName === "java.lang.Integer") {
            const data_output = new Output(socket_param_integer, param.name, param);
            node.addOutput(data_output.id, data_output);
        }
        if (param.type.qualifiedName === "java.lang.Long") {
            const data_output = new Output(socket_param_long, param.name, param);
            node.addOutput(data_output.id, data_output);
        }
        if (param.type.qualifiedName === "java.lang.Float") {
            const data_output = new Output(socket_param_float, param.name, param);
            node.addOutput(data_output.id, data_output);
        }
        if (param.type.qualifiedName === "java.lang.Double") {
            const data_output = new Output(socket_param_double, param.name, param);
            node.addOutput(data_output.id, data_output);
        }
        if (param.type.qualifiedName === "java.lang.Boolean") {
            const data_output = new Output(socket_param_boolean, param.name, param);
            node.addOutput(data_output.id, data_output);
        }
        if (param.type.qualifiedName === "java.lang.String") {
            const data_output = new Output(socket_param_string, param.name, param);
            node.addOutput(data_output.id, data_output);
        }
        if (param.type.qualifiedName === "java.util.List") {
            const data_output = new Output(socket_param_list, param.name, param);
            node.addOutput(data_output.id, data_output);
        }
        if (param.type.qualifiedName === "java.util.Map") {
            const data_output = new Output(socket_param_map, param.name, param);
            node.addOutput(data_output.id, data_output);
        }
    }
}

/**
 * 根据FunctionDefinition构造节点
 */
function customNode(qualifiedName) {
    if (qualifiedName.startsWith("CONTROL.")) {
        return createControlNode(qualifiedName)
    } else {
        return createFunctionNode(qualifiedName)
    }
}

function createControlNode(qualifiedName) {
    const def = store.getters.findControlDef(qualifiedName);
    // 创建节点
    const node = new Node(qualifiedName, def, true);
    // 执行引脚
    for (let i = 0; i < def.execPins.length; i++) {
        const param = def.execPins[i];
        if (param.input) {
            // 创建输入引脚
            const exec_input = new Input(socket_exec, param.name, param);
            node.addInput(exec_input.id, exec_input);
        } else {
            // 创建输出引脚
            const exec_output = new Output(socket_exec, param.name, param);
            node.addOutput(exec_output.id, exec_output);
        }
    }
    // 数据引脚
    for (let i = 0; i < def.paramPins.length; i++) {
        const param = def.paramPins[i].paramDef;
        buildInputOutputControl(node, param)
    }
    return node;
}

function createFunctionNode(qualifiedName) {
    const def = store.getters.findFunctionDef(qualifiedName);
    // 创建节点
    const node = new Node(qualifiedName, def, false);
    // 执行引脚逻辑，具体根据def.executable决定是否可以双模式
    const exec_input = new Input(socket_exec, "Exec", def);
    node.addInput(exec_input.id, exec_input);
    const exec_output = new Output(socket_exec, "Exec", def);
    node.addOutput(exec_output.id, exec_output);

    for (let i = 0; i < def.params.length; i++) {
        const param = def.params[i];
        buildInputOutputControl(node, param)
    }
    return node;
}

export {
    preSetupEditor,
    customNode
}