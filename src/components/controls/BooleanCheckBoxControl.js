import BooleanCheckBox from "../components/BooleanCheckBox.vue"
import { Control } from "@/core/Types"

class BooleanCheckBoxControl extends Control {
    constructor({ value, onChange, editor = undefined, nodeId = undefined, inputId = undefined }) {
        super();
        Object.assign(this, { value, onChange, editor, nodeId, inputId })
    }
}
export { BooleanCheckBoxControl, BooleanCheckBox };