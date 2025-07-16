import { ClassicPreset } from "rete";

class Node extends ClassicPreset.Node {
    constructor(label, meta = {}) {
        super(label);
        Object.assign(this, { meta });
    }
}

class Connection extends ClassicPreset.Connection { }

class Socket extends ClassicPreset.Socket { }

class Input extends ClassicPreset.Input {
    constructor(socket, label, multipleConnections = false) {
        super(socket, label, multipleConnections);
        // Object.assign(this, { control_ref: undefined })
    }
}

class Output extends ClassicPreset.Output {
    constructor(socket, label, multipleConnections = false) {
        super(socket, label, multipleConnections);
        // Object.assign(this, { control_ref: undefined })
    }
}

class Control extends ClassicPreset.Control {
    constructor() {
        super();
        // Object.assign(this, { input_ref: undefined, output_ref: undefined })
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