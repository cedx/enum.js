'use strict';

/**
 * Provides helper methods for enumerations.
 */
exports.Enum = class Enum {

  /**
   * Creates an enumeration from the specified type definition.
   * @param {object} typeDef An object defining the shape of the enumerated type.
   * @return {object} The newly created enumeration.
   */
  static create(typeDef) {
    let enumType = class {
      /* eslint-disable require-jsdoc */
      constructor() { throw new TypeError('This type is not instantiable.'); }
      static isDefined(value) { return Enum.isDefined(enumType, value); }
      static getName(value) { return Enum.getName(enumType, value); }
      static getNames() { return Enum.getNames(enumType); }
      static getValues() { return Enum.getValues(enumType); }
      /* eslint-enable require-jsdoc */
    };

    for (let [prop, value] of Object.entries(typeDef)) {
      let type = typeof value;
      if (type == 'boolean' || type == 'number' || type == 'string') enumType[prop] = value;
    }

    return Object.freeze(enumType);
  }

  /**
   * Returns an indication whether a constant with a specified value exists in the specified enumeration.
   * @param {object} enumType An enumerated type.
   * @param {*} value The value of a constant in the specified enumeration.
   * @return {boolean} `true` if a constant in the specified enumeration has the specified value, otherwise `false`.
   */
  static isDefined(enumType, value) {
    return Enum.getValues(enumType).includes(value);
  }

  /**
   * Retrieves the name of the constant in the specified enumeration that has the specified value.
   * @param {object} enumType An enumerated type.
   * @param {*} value The value of a constant in the specified enumeration.
   * @return {string} A string containing the name of the enumerated constant that has the specified value, or an empty string if no such constant is found.
   */
  static getName(enumType, value) {
    let index = Enum.getValues(enumType).indexOf(value);
    return index < 0 ? '' : Enum.getNames(enumType)[index];
  }

  /**
   * Retrieves an array of the names of the constants in the specified enumeration.
   * @param {object} enumType An enumerated type.
   * @return {string[]} An array that contains the names of the constants in the specified enumeration.
   */
  static getNames(enumType) {
    return Object.keys(enumType);
  }

  /**
   * Retrieves an array of the values of the constants in the specified enumeration.
   * @param {object} enumType An enumerated type.
   * @return {Array} An array that contains the values of the constants in the specified enumeration.
   */
  static getValues(enumType) {
    return Object.values(enumType);
  }
};
