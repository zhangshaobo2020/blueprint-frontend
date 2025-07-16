import StringInput from "../components/StringInput.vue"
import { Control } from "@/core/Types"

class StringInputControl extends Control {
    constructor({ value, onInput, editor = undefined, nodeId = undefined, inputId = undefined }) {
        super();
        Object.assign(this, { value, onInput, editor, nodeId, inputId })
    }
}
export { StringInputControl, StringInput };