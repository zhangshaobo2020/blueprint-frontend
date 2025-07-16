import { ClassicPreset } from "rete";

class Node extends ClassicPreset.Node {
    constructor(label, meta = {}) {
        super(label);
        Object.assign(this, { meta });
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
    constructor(socket, label, multipleConnections = false) {
        super(socket, label, multipleConnections);
    }
}

class Output extends ClassicPreset.Output {
    constructor(socket, label, multipleConnections = false) {
        super(socket, label, multipleConnections);
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