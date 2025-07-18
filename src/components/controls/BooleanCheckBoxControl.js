import BooleanCheckBox from "../components/BooleanCheckBox.vue"
import { Control } from "@/core/Types"

class BooleanCheckBoxControl extends Control {
    constructor({ value, onChange, nodeId = undefined, inputId = undefined }) {
        super();
        this.value = value;
        this.onChange = onChange;
        this.nodeId = nodeId;
        this.inputId = inputId;
    }
}
export { BooleanCheckBoxControl, BooleanCheckBox };