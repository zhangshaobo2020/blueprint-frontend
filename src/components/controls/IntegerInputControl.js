import IntegerInput from "../components/IntegerInput.vue"
import { Control } from "@/core/Types"

class IntegerInputControl extends Control {
    constructor({ value, onChange, editor = undefined, nodeId = undefined, inputId = undefined }) {
        super();
        Object.assign(this, { value, onChange, editor, nodeId, inputId })
    }
}
export { IntegerInputControl, IntegerInput };