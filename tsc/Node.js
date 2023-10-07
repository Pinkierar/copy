import { ValueComplex } from './Value.js';
export class Node {
    _parent;
    keyIndex;
    constructor(parent, keyIndex) {
        this._parent = parent;
        this.keyIndex = keyIndex;
    }
    get parent() {
        if (!this._parent)
            throw new Error('it is root');
        return this._parent;
    }
    isLast() {
        const lastIndex = this.parent.value.length - 1;
        return this.keyIndex >= lastIndex;
    }
    get keyName() {
        const key = this.parent.value.getKeyName(this.keyIndex);
        if (key === undefined)
            throw new Error('ketIndex is out of complex');
        return key;
    }
}
export class NodeSimple extends Node {
    value;
    constructor(parent, keyIndex, value) {
        super(parent, keyIndex);
        this.value = value;
    }
}
export class NodeComplex extends Node {
    value;
    clone;
    constructor(parent, keyIndex, complex) {
        super(parent, keyIndex);
        this.clone = complex.toEmpty();
        this.value = complex;
    }
    static createRoot(complex) {
        return new NodeComplex(null, NaN, complex);
    }
    createChild(keyIndex, value) {
        if (value instanceof ValueComplex)
            return new NodeComplex(this, keyIndex, value);
        return new NodeSimple(this, keyIndex, value);
    }
    getFirstChild() {
        return this.getChild(0);
    }
    getChildAfter(keyIndex) {
        return this.getChild(keyIndex + 1);
    }
    getChild(keyIndex) {
        const value = this.value.get(keyIndex);
        if (!value)
            throw new Error('child not found');
        return this.createChild(keyIndex, value);
    }
}
