/** A symbol indicating that an object is an enumeration. */
const isEnum: unique symbol = Symbol('Enum');

/**
 * An object that looks like an enumerated type.
 * @typeparam T The type of the object values.
 */
export type EnumLike<T extends EnumValue> = Record<string, T>;

/** A value of an enumerated type. */
export type EnumValue = boolean|number|string;

/** Provides helper methods for enumerations. */
export abstract class Enum {

  /**
   * Returns the specified value if it exists in the specified enumeration, otherwise throws an exception.
   * @param enumType An enumerated type.
   * @param value The value to check.
   * @return The specified enumerated constant.
   * @throws [[TypeError]] No such constant was found.
   */
  static assert<T extends object>(enumType: T, value: any): T[keyof T] {
    if (Enum.isDefined<T>(enumType, value)) return value;
    throw new TypeError(`Invalid enumerated value: ${value}`);
  }

  /**
   * Returns the specified value if it exists in the specified enumeration, otherwise returns the given default value.
   * @param enumType An enumerated type.
   * @param value The value to coerce.
   * @param defaultValue The default value to return if the specified constant does not exist.
   * @return The specified enumerated constant, or the default value if no such constant is found.
   */
  static coerce<T extends object>(enumType: T, value: any, defaultValue?: T[keyof T]): T[keyof T]|undefined {
    return Enum.isDefined<T>(enumType, value) ? value : defaultValue;
  }

  /**
   * Creates an enumeration from the specified type definition.
   * @param typeDef An object defining the shape of the enumerated type.
   * @return The newly created enumeration.
   * @typeparam T The type of the enumerated values.
   */
  static create<T extends EnumValue>(typeDef: EnumLike<T>): Readonly<EnumType<T>> {
    const descriptor = {configurable: false, enumerable: false, writable: false};
    const enumType = {};
    Reflect.defineProperty(enumType, isEnum, {...descriptor, value: true});

    const scalarTypes = ['boolean', 'number', 'string'];
    for (const [name, value] of Object.entries(typeDef))
      if (scalarTypes.includes(typeof value)) Reflect.defineProperty(enumType, name, {...descriptor, enumerable: true, value});

    const methods = ['assert', 'coerce', 'entries', 'getIndex', 'getName', 'isDefined', 'names', 'values'];
    for (const name of methods) {
      const method = Reflect.get(Enum, name).bind(enumType, enumType);
      Reflect.defineProperty(enumType, name, {...descriptor, value: method});
    }

    return Object.freeze(enumType as EnumType<T>);
  }

  /**
   * Gets an array of the `[name, value]` pairs of the constants in the specified enumeration.
   * @param enumType An enumerated type.
   * @return An array that contains the `[name, value]` pairs of the constants in the specified enumeration.
   */
  static entries<T extends object>(enumType: T): Array<[string, T[keyof T]]> {
    return Enum._hasEnumSymbol(enumType) || Enum._isStringEnum(enumType)
      ? Object.entries(enumType)
      : Enum.names(enumType).map(name => [name, Reflect.get(enumType, name)]);
  }

  /**
   * Gets the zero-based position of the constant in the specified enumeration that has the specified value.
   * @param enumType An enumerated type.
   * @param value The value of a constant in the enumerated type.
   * @return The zero-based position of the constant that has the specified value, or `-1` if no such constant is found.
   */
  static getIndex<T extends object>(enumType: T, value: any): number {
    return Enum.values<T>(enumType).indexOf(value);
  }

  /**
   * Gets the name of the constant in the specified enumeration that has the specified value.
   * @param enumType An enumerated type.
   * @param value The value of a constant in the enumerated type.
   * @return A string containing the name of the constant that has the specified value, or an empty string if no such constant is found.
   */
  static getName<T extends object>(enumType: T, value: any): string {
    const index = Enum.getIndex<T>(enumType, value);
    return index >= 0 ? Enum.names(enumType)[index] : '';
  }

  /**
   * Gets an indication whether a constant with a specified value exists in the specified enumeration.
   * @param enumType An enumerated type.
   * @param value The value to check.
   * @return `true` if a constant in the specified enumeration has the specified value, otherwise `false`.
   */
  static isDefined<T extends object>(enumType: T, value: any): value is T[keyof T] {
    return Enum.values<T>(enumType).includes(value);
  }

  /**
   * Gets an array of the names of the constants in the specified enumeration.
   * @param enumType An enumerated type.
   * @return An array that contains the names of the constants in the specified enumeration.
   */
  static names(enumType: object): string[] {
    const isNumeric = /^\d+$/;
    return Enum._hasEnumSymbol(enumType) || Enum._isStringEnum(enumType)
      ? Object.keys(enumType)
      : Object.keys(enumType).filter(key => !isNumeric.test(key));
  }

  /**
   * Gets an array of the values of the constants in the specified enumeration.
   * @param enumType An enumerated type.
   * @return An array that contains the values of the constants in the specified enumeration.
   */
  static values<T extends object>(enumType: T): Array<T[keyof T]> {
    return Enum._hasEnumSymbol(enumType) || Enum._isStringEnum(enumType)
      ? Object.values(enumType)
      : Object.values(enumType).filter(value => typeof value == 'number');
  }

  /**
   * Returns a value indicating whether the specified enumeration is a TypeScript one.
   * @param enumType An enumerated type.
   * @return `true` if the specified enumeration is a TypeScript one, otherwise `false`.
   */
  private static _hasEnumSymbol(enumType: object): boolean {
    return Reflect.has(enumType, isEnum) && (Reflect.get(enumType, isEnum) === true);
  }

  /**
   * Returns a value indicating whether the specified enumeration is a string one.
   * @param enumType An enumerated type.
   * @return `true` if the specified enumeration is a string one, otherwise `false`.
   */
  private static _isStringEnum(enumType: object): boolean {
    return Object.values(enumType).every(value => typeof value == 'string');
  }
}

/**
 * An enumerated type.
 * @typeparam T The type of the enumerated values.
 */
export interface EnumType<T extends EnumValue> extends Record<string, T|Function> {

  /**
   * Returns the specified value if it exists in this enumeration, otherwise throws an exception.
   * @param value The value to check.
   * @return The specified enumerated constant.
   * @throws [[TypeError]] No such constant was found.
   */
  assert(value: any): T;

  /**
   * Returns the specified value if it exists in this enumeration, otherwise returns the given default value.
   * @param value The value to coerce.
   * @param defaultValue The default value to return if the specified constant does not exist.
   * @return The specified enumerated constant, or the default value if no such constant is found.
   */
  coerce(value: any, defaultValue?: T): T|undefined;

  /**
   * Gets an array of the `[name, value]` pairs of the constants in this enumeration.
   * @return An array that contains the `[name, value]` pairs of the constants in this enumeration.
   */
  entries(): Array<[string, T]>;

  /**
   * Gets the zero-based position of the constant in this enumeration that has the specified value.
   * @param value The value of a constant in this enumeration.
   * @return The zero-based position of the constant that has the specified value, or `-1` if no such constant is found.
   */
  getIndex(value: any): number;

  /**
   * Gets the name of the constant in this enumeration that has the specified value.
   * @param value The value of a constant in this enumeration.
   * @return A string containing the name of the constant that has the specified value, or an empty string if no such constant is found.
   */
  getName(value: any): string;

  /**
   * Gets an indication whether a constant with a specified value exists in this enumeration.
   * @param value The value to check.
   * @return `true` if a constant in this enumeration has the specified value, otherwise `false`.
   */
  isDefined(value: any): value is T;

  /**
   * Gets an array of the names of the constants in this enumeration.
   * @return An array that contains the names of the constants in this enumeration.
   */
  names(): string[];

  /**
   * Gets an array of the values of the constants in this enumeration.
   * @return An array that contains the values of the constants in this enumeration.
   */
  values(): T[];
}
