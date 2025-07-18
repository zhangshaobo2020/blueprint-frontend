import StringInput from "../components/StringInput.vue"
import { Control } from "@/core/Types"

class StringInputControl extends Control {
    constructor({ value, onChange, nodeId = undefined, inputId = undefined }) {
        super();
        this.value = value;
        this.onChange = onChange;
        this.nodeId = nodeId;
        this.inputId = inputId;
    }
}
export { StringInputControl, StringInput };