import { ClassicPreset } from "rete";

class Node extends ClassicPreset.Node {
    // meta = FunctionDefinition
    constructor(label, meta = {}, hasExec = false) {
        super(label);
        this.meta = meta;
        this.hasExec = hasExec;
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
        super(socket, name, true);
        this.meta = meta;
    }
}

class Output extends ClassicPreset.Output {
    constructor(socket, name, meta = {}) {
        super(socket, name, true);
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