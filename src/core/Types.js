import { ClassicPreset } from "rete";

class Node extends ClassicPreset.Node {
    // meta = FunctionDefinition
    constructor(label, meta = {}, editor = undefined, area = undefined) {
        super(label);
        Object.assign(this, { meta, editor, area });
    }
}

class Connection extends ClassicPreset.Connection { }

class Socket extends ClassicPreset.Socket {
    constructor(name, color = "#000000") {
        super(name);
        Object.assign(this, { color });
    }
}

class Input extends ClassicPreset.Input {
    constructor(socket, name, meta = {}) {
        super(socket, name, false);
        Object.assign(this, { meta });
    }
}

class Output extends ClassicPreset.Output {
    constructor(socket, name, meta = {}) {
        super(socket, name, false);
        Object.assign(this, { meta });
    }
}

class Control extends ClassicPreset.Control {
    constructor() {
        super();
    }
}

export {
    Node,
    Connection,
    Socket,
    Input,
    Output,
    Control
}