import DoubleInput from "../components/DoubleInput.vue"
import { Control } from "@/core/Types"

class DoubleInputControl extends Control {
    constructor({ value, onChange, editor = undefined, nodeId = undefined, inputId = undefined }) {
        super();
        this.value = value;
        this.onChange = onChange;
        this.editor = editor;
        this.nodeId = nodeId;
        this.inputId = inputId;
    }
}
export { DoubleInputControl, DoubleInput };