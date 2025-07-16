import NumberInput from "./NumberInput.vue"
import { Control } from "@/core/Types"

class NumberInputControl extends Control {
    constructor({ value, onChange, editor = undefined, nodeId = undefined, inputId = undefined }) {
        super();
        Object.assign(this, { value, onChange, editor, nodeId, inputId })
    }
}
export { NumberInputControl, NumberInput };