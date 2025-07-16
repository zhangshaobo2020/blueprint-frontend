import FloatInput from "../components/FloatInput.vue"
import { Control } from "@/core/Types"

class FloatInputControl extends Control {
    constructor({ value, onChange, editor = undefined, nodeId = undefined, inputId = undefined }) {
        super();
        Object.assign(this, { value, onChange, editor, nodeId, inputId })
    }
}
export { FloatInputControl, FloatInput };