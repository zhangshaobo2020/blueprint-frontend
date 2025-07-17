import { ClassicPreset } from "rete";

class Node extends ClassicPreset.Node {
    // meta = FunctionDefinition
    constructor(label, meta = {}) {
        super(label);
        this.meta = meta;
    }
}

class Connection extends ClassicPreset.Connection { }

class Socket extends ClassicPreset.Socket {
    constructor(name, color = "#000000") {
        super(name);
        this.color = color;
    }
}

class Input extends ClassicPreset.Input {
    constructor(socket, name, meta = {}) {
        super(socket, name, false);
        this.meta = meta;
    }
}

class Output extends ClassicPreset.Output {
    constructor(socket, name, meta = {}) {
        super(socket, name, false);
        this.meta = meta;
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