'use strict';

/**
 * Provides helper methods for enumerations.
 */
class Enum {

  /**
   * Returns the specified value if it exists in the specified enumeration, otherwise throws an exception.
   * @param {object} enumType An enumerated type.
   * @param {*} value The value of a constant in the specified enumeration.
   * @return {*} The specified enumerated constant.
   * @throws {TypeError} No such constant was found.
   */
  static assert(enumType, value) {
    if (Enum.isDefined(enumType, value)) return value;
    throw new TypeError(`Invalid enumerated value: ${value}`);
  }

  /**
   * Creates an enumeration from the specified type definition.
   * @param {object} typeDef An object defining the shape of the enumerated type.
   * @return {object} The newly created enumeration.
   */
  static create(typeDef) {
    let enumType = class {
      /* eslint-disable require-jsdoc */
      constructor() { throw new TypeError('This type is not instantiable.'); }
      static assert(value) { return Enum.assert(enumType, value); }
      static coerce(value, defaultValue = null) { return Enum.coerce(enumType, value, defaultValue); }
      static entries() { return Enum.getEntries(enumType); }
      static isDefined(value) { return Enum.isDefined(enumType, value); }
      static getIndex(value) { return Enum.getIndex(enumType, value); }
      static getName(value) { return Enum.getName(enumType, value); }
      static names() { return Enum.getNames(enumType); }
      static values() { return Enum.getValues(enumType); }
      /* eslint-enable require-jsdoc */
    };

    for (let [key, value] of Object.entries(typeDef)) {
      let type = typeof value;
      if (type == 'boolean' || type == 'number' || type == 'string') enumType[key] = value;
    }

    return Object.freeze(enumType);
  }

  /**
   * Returns the specified value if it exists in the specified enumeration, otherwise returns the given default value.
   * @param {object} enumType An enumerated type.
   * @param {*} value The value of a constant in the specified enumeration.
   * @param {*} [defaultValue] The default value to return if the specified constant does not exist.
   * @return {*} The specified enumerated constant, or the default value if no such constant is found.
   */
  static coerce(enumType, value, defaultValue = null) {
    return Enum.isDefined(enumType, value) ? value : defaultValue;
  }

  /**
   * Gets an indication whether a constant with a specified value exists in the specified enumeration.
   * @param {object} enumType An enumerated type.
   * @param {*} value The value of a constant in the specified enumeration.
   * @return {boolean} `true` if a constant in the specified enumeration has the specified value, otherwise `false`.
   */
  static isDefined(enumType, value) {
    return Enum.getValues(enumType).includes(value);
  }

  /**
   * Gets an array of the `[name, value]` pairs of the constants in the specified enumeration.
   * @param {object} enumType An enumerated type.
   * @return {Array} An array that contains the `[name, value]` pairs of the constants in the specified enumeration.
   */
  static getEntries(enumType) {
    return Object.entries(enumType);
  }

  /**
   * Gets the zero-based position of the constant in the specified enumeration that has the specified value.
   * @param {object} enumType An enumerated type.
   * @param {*} value The value of a constant in the specified enumeration.
   * @return {number} The zero-based position of the constant that has the specified value, or `-1` if no such constant is found.
   */
  static getIndex(enumType, value) {
    return Enum.getValues(enumType).indexOf(value);
  }

  /**
   * Gets the name of the constant in the specified enumeration that has the specified value.
   * @param {object} enumType An enumerated type.
   * @param {*} value The value of a constant in the specified enumeration.
   * @return {string} A string containing the name of the constant that has the specified value, or an empty string if no such constant is found.
   */
  static getName(enumType, value) {
    let index = Enum.getIndex(enumType, value);
    return index >= 0 ? Enum.getNames(enumType)[index] : '';
  }

  /**
   * Gets an array of the names of the constants in the specified enumeration.
   * @param {object} enumType An enumerated type.
   * @return {string[]} An array that contains the names of the constants in the specified enumeration.
   */
  static getNames(enumType) {
    return Object.keys(enumType);
  }

  /**
   * Gets an array of the values of the constants in the specified enumeration.
   * @param {object} enumType An enumerated type.
   * @return {Array} An array that contains the values of the constants in the specified enumeration.
   */
  static getValues(enumType) {
    return Object.values(enumType);
  }
}

// Module exports.
exports.Enum = Enum;
