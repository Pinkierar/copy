export class Value {
    static isComplex(value) {
        if (!value)
            return false; // null | undefined | 0 | '' | false
        if (typeof value === 'object')
            return true; // object
        if (Array.isArray(value))
            return true; // array
        return false; // string | number | symbol | true | function
    }
}
export class ValueSimple extends Value {
    value;
    constructor(value) {
        super();
        this.value = value;
    }
}
export class ValueComplex extends Value {
    value;
    keys;
    constructor(value) {
        super();
        this.value = value;
        this.updateKeys();
    }
    getKeyName(keyIndex) {
        return this.keys[keyIndex];
    }
    get(keyIndex) {
        const key = this.getKeyName(keyIndex);
        if (key === undefined)
            return null;
        const valueAny = Array.isArray(this.value)
            ? this.value[this.toArrayIndex(key)]
            : this.value[key];
        return Value.isComplex(valueAny)
            ? new ValueComplex(valueAny)
            : new ValueSimple(valueAny);
    }
    set(key, value) {
        if (Array.isArray(this.value)) {
            this.value[this.toArrayIndex(key)] = value.value;
        }
        else {
            this.value[key] = value.value;
        }
        this.updateKeys();
    }
    toEmpty() {
        const emptyValue = Array.isArray(this.value) ? [] : {};
        return new ValueComplex(emptyValue);
    }
    get length() {
        return this.keys.length;
    }
    isEmpty() {
        return this.length === 0;
    }
    //
    updateKeys() {
        this.keys = Object.keys(this.value);
    }
    toArrayIndex(key) {
        const index = Number(key);
        if (Number.isNaN(index))
            throw new Error('key is NaN');
        return index;
    }
}
