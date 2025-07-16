import TextInput from "./TextInput.vue"
import { Control } from "@/core/Types"

class TextInputControl extends Control {
    constructor({ value, onInput }) {
        super();
        Object.assign(this, { value, onInput })
    }
}
export { TextInputControl, TextInput };