import FloatInput from "../components/FloatInput.vue"
import { Control } from "@/core/Types"

class FloatInputControl extends Control {
    constructor({ value, onChange, nodeId = undefined, inputId = undefined, outputId = undefined }) {
        super();
        this.value = value;
        this.onChange = onChange;
        this.nodeId = nodeId;
        this.inputId = inputId;
        this.outputId = outputId;
    }
}
export { FloatInputControl, FloatInput };