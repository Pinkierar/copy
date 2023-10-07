import {ValueComplex, ValueSimple} from './Value.js';

export abstract class Node {
  private readonly _parent: NodeComplex;
  public readonly keyIndex: number;
  public abstract readonly value: ValueSimple | ValueComplex;

  protected constructor(parent: NodeComplex, keyIndex: number) {
    this._parent = parent;
    this.keyIndex = keyIndex;
  }

  public get parent(): NodeComplex {
    if (!this._parent) throw new Error('it is root');
    return this._parent;
  }

  public isLast(): boolean {
    const lastIndex = this.parent.value.length - 1;

    return this.keyIndex >= lastIndex;
  }

  public get keyName(): Key {
    const key = this.parent.value.getKeyName(this.keyIndex);
    if (key === undefined) throw new Error('ketIndex is out of complex');

    return key;
  }
}

export class NodeSimple extends Node {
  public readonly value: ValueSimple;

  public constructor(parent: NodeComplex, keyIndex: number, value: ValueSimple) {
    super(parent, keyIndex);

    this.value = value;
  }
}

export class NodeComplex extends Node {
  public readonly value: ValueComplex;
  public readonly clone: ValueComplex;

  private constructor(parent: NodeComplex, keyIndex: number, complex: ValueComplex) {
    super(parent, keyIndex);

    this.clone = complex.toEmpty();
    this.value = complex;
  }

  public static createRoot(complex: ValueComplex): NodeComplex {
    return new NodeComplex(null!, NaN, complex);
  }

  public createChild(keyIndex: number, value: ValueSimple | ValueComplex): NodeSimple | NodeComplex {
    if (value instanceof ValueComplex)
      return new NodeComplex(this, keyIndex, value);
    return new NodeSimple(this, keyIndex, value);
  }

  public getFirstChild(): NodeSimple | NodeComplex {
    return this.getChild(0);
  }

  public getChildAfter(keyIndex: number): NodeSimple | NodeComplex {
    return this.getChild(keyIndex + 1);
  }

  public getChild(keyIndex: number): NodeSimple | NodeComplex {
    const value = this.value.get(keyIndex);
    if (!value) throw new Error('child not found');

    return this.createChild(keyIndex, value);
  }
}