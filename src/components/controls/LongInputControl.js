import LongInput from "../components/LongInput.vue"
import { Control } from "@/core/Types"

class LongInputControl extends Control {
    constructor({ value, onChange, editor = undefined, nodeId = undefined, inputId = undefined }) {
        super();
        Object.assign(this, { value, onChange, editor, nodeId, inputId })
    }
}
export { LongInputControl, LongInput };