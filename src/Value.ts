export abstract class Value {
  public abstract readonly value: Complex | Simple;

  public static isComplex(value: any): value is Complex {
    if (!value) return false; // null | undefined | 0 | '' | false
    if (typeof value === 'object') return true; // object
    if (Array.isArray(value)) return true; // array
    return false; // string | number | symbol | true | function
  }
}

export class ValueSimple extends Value {
  public override readonly value: Simple;

  public constructor(value: Simple) {
    super();

    this.value = value;
  }
}

export class ValueComplex extends Value {
  public override readonly value: Complex;
  private keys!: Key[];

  public constructor(value: Complex) {
    super();

    this.value = value;
    this.updateKeys();
  }

  public getKeyName(keyIndex: number): Key | undefined {
    return this.keys[keyIndex];
  }

  public get(keyIndex: number): ValueComplex | ValueSimple | null {
    const key = this.getKeyName(keyIndex) as Key | undefined;
    if (key === undefined) return null;

    const valueAny = Array.isArray(this.value)
      ? this.value[this.toArrayIndex(key)]
      : this.value[key];

    return Value.isComplex(valueAny)
      ? new ValueComplex(valueAny)
      : new ValueSimple(valueAny);
  }

  public set(key: Key, value: ValueComplex | ValueSimple): void {
    if (Array.isArray(this.value)) {
      this.value[this.toArrayIndex(key)] = value.value;
    } else {
      this.value[key] = value.value;
    }

    this.updateKeys();
  }

  public toEmpty(): ValueComplex {
    const emptyValue = Array.isArray(this.value) ? [] : {};

    return new ValueComplex(emptyValue);
  }

  public get length(): number {
    return this.keys.length;
  }

  public isEmpty(): boolean {
    return this.length === 0;
  }

  //

  private updateKeys(): void {
    this.keys = Object.keys(this.value);
  }

  private toArrayIndex(key: Key): number {
    const index = Number(key);
    if (Number.isNaN(index)) throw new Error('key is NaN');

    return index;
  }
}