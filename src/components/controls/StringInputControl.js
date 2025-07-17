import StringInput from "../components/StringInput.vue"
import { Control } from "@/core/Types"

class StringInputControl extends Control {
    constructor({ value, onChange, editor = undefined, nodeId = undefined, inputId = undefined }) {
        super();
        Object.assign(this, { value, onChange, editor, nodeId, inputId })
    }
}
export { StringInputControl, StringInput };