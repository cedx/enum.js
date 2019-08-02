/** Defines the shape of an enumerated value. */
export type EnumValue = bigint|boolean|number|string;

/** Defines the shape of an enumerated type. */
export interface EnumLike<T extends EnumValue> {

  /** Gets the enumerated value corresponding to the given key. */
  [key: string]: T;
}

/** Provides helper methods for enumerations. */
export abstract class Enum<T extends EnumValue> {

  /**
   * Creates an enumeration from the specified type definition.
   * @param {Object<string, EnumValue>} typeDef An object defining the shape of the enumerated type.
   * @return {Enum} The newly created enumeration.
   */
  static create<T extends EnumValue>(typeDef: EnumLike<T>): Enum<T> {
    const enumType = new class extends Enum<T> {};
    for (const [key, value] of Object.entries<T>(typeDef))
      if (['bigint', 'boolean', 'number', 'string'].includes(typeof value)) enumType[key] = value;

    return Object.freeze(enumType);
  }

  /**
   * Returns the specified value if it exists in this enumeration, otherwise throws an exception.
   * @param value The value of a constant in this enumeration.
   * @return The specified enumerated constant.
   * @throws [[TypeError]] No such constant was found.
   */
  assert(value: T): T {
    if (this.isDefined(value)) return value;
    throw new TypeError(`Invalid enumerated value: ${value}`);
  }

  /**
   * Returns the specified value if it exists in this enumeration, otherwise returns the given default value.
   * @param value The value of a constant in this enumeration.
   * @param defaultValue The default value to return if the specified constant does not exist.
   * @return The specified enumerated constant, or the default value if no such constant is found.
   */
  coerce(value: T, defaultValue?: T): T|undefined {
    return this.isDefined(value) ? value : defaultValue;
  }

  /**
   * Gets an array of the `[name, value]` pairs of the constants in this enumeration.
   * @return An array that contains the `[name, value]` pairs of the constants in this enumeration.
   */
  entries(): Array<[string, T]> {
    return Object.entries<T>(this as EnumLike<T>);
  }

  /**
   * Gets an indication whether a constant with a specified value exists in this enumeration.
   * @param value The value of a constant in this enumeration.
   * @return `true` if a constant in this enumeration has the specified value, otherwise `false`.
   */
  isDefined(value: T): boolean {
    return this.values().includes(value);
  }

  /**
   * Gets the zero-based position of the constant in this enumeration that has the specified value.
   * @param value The value of a constant in this enumeration.
   * @return The zero-based position of the constant that has the specified value, or `-1` if no such constant is found.
   */
  getIndex(value: T): number {
    return this.values().indexOf(value);
  }

  /**
   * Gets the name of the constant in this enumeration that has the specified value.
   * @param value The value of a constant in this enumeration.
   * @return A string containing the name of the constant that has the specified value, or an empty string if no such constant is found.
   */
  getName(value: T): string {
    const index = this.getIndex(value);
    return index >= 0 ? this.names()[index] : '';
  }

  /**
   * Gets an array of the names of the constants in this enumeration.
   * @return An array that contains the names of the constants in this enumeration.
   */
  names(): string[] {
    return Object.keys(this);
  }

  /**
   * Gets an array of the values of the constants in this enumeration.
   * @return An array that contains the values of the constants in this enumeration.
   */
  values(): T[] {
    return Object.values<T>(this as EnumLike<T>);
  }

  /** Gets the enumerated value corresponding to the given key. */
  [key: string]: T|Function;
}
