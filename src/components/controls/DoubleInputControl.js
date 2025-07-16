import DoubleInput from "../components/DoubleInput.vue"
import { Control } from "@/core/Types"

class DoubleInputControl extends Control {
    constructor({ value, onChange, editor = undefined, nodeId = undefined, inputId = undefined }) {
        super();
        Object.assign(this, { value, onChange, editor, nodeId, inputId })
    }
}
export { DoubleInputControl, DoubleInput };