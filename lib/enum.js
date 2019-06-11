/**
 * Defines the shape of an enumerated value.
 * @typedef {boolean|number|string} EnumValue
 */

/**
 * Provides helper methods for enumerations.
 * @abstract
 */
export class Enum {

  /**
   * Creates an enumeration from the specified type definition.
   * @param {Object<string, EnumValue>} typeDef An object defining the shape of the enumerated type.
   * @return {Enum} The newly created enumeration.
   */
  static create(typeDef) {
    const enumType = new class extends Enum {};
    for (const [key, value] of Object.entries(typeDef))
      if (['boolean', 'number', 'string'].includes(typeof value)) enumType[key] = value;

    return Object.freeze(enumType);
  }

  /**
   * Returns the specified value if it exists in the specified enumeration, otherwise throws an exception.
   * @param {EnumValue} value The value of a constant in the specified enumeration.
   * @return {EnumValue} The specified enumerated constant.
   * @throws {TypeError} No such constant was found.
   */
  assert(value) {
    if (this.isDefined(value)) return value;
    throw new TypeError(`Invalid enumerated value: ${value}`);
  }

  /**
   * Returns the specified value if it exists in the specified enumeration, otherwise returns the given default value.
   * @param {EnumValue} value The value of a constant in the specified enumeration.
   * @param {?EnumValue} defaultValue The default value to return if the specified constant does not exist.
   * @return {?EnumValue} The specified enumerated constant, or the default value if no such constant is found.
   */
  coerce(value, defaultValue = null) {
    return this.isDefined(value) ? value : defaultValue;
  }

  /**
   * Gets an array of the `[name, value]` pairs of the constants in the specified enumeration.
   * @return {Array[]} An array that contains the `[name, value]` pairs of the constants in the specified enumeration.
   */
  entries() {
    return Object.entries(this);
  }

  /**
   * Gets an indication whether a constant with a specified value exists in the specified enumeration.
   * @param {EnumValue} value The value of a constant in the specified enumeration.
   * @return {boolean} `true` if a constant in the specified enumeration has the specified value, otherwise `false`.
   */
  isDefined(value) {
    return this.values().includes(value);
  }

  /**
   * Gets the zero-based position of the constant in the specified enumeration that has the specified value.
   * @param {EnumValue} value The value of a constant in the specified enumeration.
   * @return {number} The zero-based position of the constant that has the specified value, or `-1` if no such constant is found.
   */
  getIndex(value) {
    return this.values().indexOf(value);
  }

  /**
   * Gets the name of the constant in the specified enumeration that has the specified value.
   * @param {EnumValue} value The value of a constant in the specified enumeration.
   * @return {string} A string containing the name of the constant that has the specified value, or an empty string if no such constant is found.
   */
  getName(value) {
    const index = this.getIndex(value);
    return index >= 0 ? this.names()[index] : '';
  }

  /**
   * Gets an array of the names of the constants in the specified enumeration.
   * @return {string[]} An array that contains the names of the constants in the specified enumeration.
   */
  names() {
    return Object.keys(this);
  }

  /**
   * Gets an array of the values of the constants in the specified enumeration.
   * @return {EnumValue[]} An array that contains the values of the constants in the specified enumeration.
   */
  values() {
    return Object.values(this);
  }
}
