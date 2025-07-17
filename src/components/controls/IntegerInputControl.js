import IntegerInput from "../components/IntegerInput.vue"
import { Control } from "@/core/Types"

class IntegerInputControl extends Control {
    constructor({ value, onChange, editor = undefined, nodeId = undefined, inputId = undefined }) {
        super();
        this.value = value;
        this.onChange = onChange;
        this.editor = editor;
        this.nodeId = nodeId;
        this.inputId = inputId;
    }
}
export { IntegerInputControl, IntegerInput };