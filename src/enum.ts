/**
 * Provides helper methods for enumerations.
 */
export abstract class Enum {

  /**
   * Returns the specified value if it exists in the specified enumeration, otherwise throws an exception.
   * @param enumType An enumerated type.
   * @param value The value of a constant in the specified enumeration.
   * @return The specified enumerated constant.
   * @throws {TypeError} No such constant was found.
   */
  public static assert<T extends EnumValue>(enumType: EnumType<T>, value: T): T {
    if (Enum.isDefined(enumType, value)) return value;
    throw new TypeError(`Invalid enumerated value: ${value}`);
  }

  /**
   * Creates an enumeration from the specified type definition.
   * @param typeDef An object defining the shape of the enumerated type.
   * @return The newly created enumeration.
   */
  public static create<T extends EnumValue>(typeDef: EnumType<T>): EnumType<T> {
    // @ts-ignore
    const enumType: EnumType<T> = class {
      constructor() { throw new TypeError('This type is not instantiable.'); }
      public static assert(value: T): T { return Enum.assert(enumType, value); }
      public static coerce(value: T, defaultValue?: T): T | undefined { return Enum.coerce(enumType, value, defaultValue); }
      public static entries(): Array<[string, T]> { return Enum.getEntries(enumType); }
      public static isDefined(value: T): boolean { return Enum.isDefined(enumType, value); }
      public static getIndex(value: T): number { return Enum.getIndex(enumType, value); }
      public static getName(value: T): string { return Enum.getName(enumType, value); }
      public static names(): string[] { return Enum.getNames(enumType); }
      public static values(): T[] { return Enum.getValues(enumType); }
    };

    for (const [key, value] of Object.entries(typeDef)) {
      const type = typeof value;
      if (type == 'boolean' || type == 'number' || type == 'string') enumType[key] = value;
    }

    return Object.freeze(enumType);
  }

  /**
   * Returns the specified value if it exists in the specified enumeration, otherwise returns the given default value.
   * @param enumType An enumerated type.
   * @param value The value of a constant in the specified enumeration.
   * @param defaultValue The default value to return if the specified constant does not exist.
   * @return The specified enumerated constant, or the default value if no such constant is found.
   */
  public static coerce<T extends EnumValue>(enumType: EnumType<T>, value: T, defaultValue?: T): T | undefined {
    return Enum.isDefined(enumType, value) ? value : defaultValue;
  }

  /**
   * Gets an indication whether a constant with a specified value exists in the specified enumeration.
   * @param enumType An enumerated type.
   * @param value The value of a constant in the specified enumeration.
   * @return `true` if a constant in the specified enumeration has the specified value, otherwise `false`.
   */
  public static isDefined<T extends EnumValue>(enumType: EnumType<T>, value: T): boolean {
    return Enum.getValues(enumType).includes(value);
  }

  /**
   * Gets an array of the `[name, value]` pairs of the constants in the specified enumeration.
   * @param enumType An enumerated type.
   * @return An array that contains the `[name, value]` pairs of the constants in the specified enumeration.
   */
  public static getEntries<T extends EnumValue>(enumType: EnumType<T>): Array<[string, T]> {
    return Object.entries(enumType);
  }

  /**
   * Gets the zero-based position of the constant in the specified enumeration that has the specified value.
   * @param enumType An enumerated type.
   * @param value The value of a constant in the specified enumeration.
   * @return The zero-based position of the constant that has the specified value, or `-1` if no such constant is found.
   */
  public static getIndex<T extends EnumValue>(enumType: EnumType<T>, value: T): number {
    return Enum.getValues(enumType).indexOf(value);
  }

  /**
   * Gets the name of the constant in the specified enumeration that has the specified value.
   * @param enumType An enumerated type.
   * @param value The value of a constant in the specified enumeration.
   * @return A string containing the name of the constant that has the specified value, or an empty string if no such constant is found.
   */
  public static getName<T extends EnumValue>(enumType: EnumType<T>, value: T): string {
    const index = Enum.getIndex(enumType, value);
    return index >= 0 ? Enum.getNames(enumType)[index] : '';
  }

  /**
   * Gets an array of the names of the constants in the specified enumeration.
   * @param enumType An enumerated type.
   * @return An array that contains the names of the constants in the specified enumeration.
   */
  public static getNames<T extends EnumValue>(enumType: EnumType<T>): string[] {
    return Object.keys(enumType);
  }

  /**
   * Gets an array of the values of the constants in the specified enumeration.
   * @param enumType An enumerated type.
   * @return An array that contains the values of the constants in the specified enumeration.
   */
  public static getValues<T extends EnumValue>(enumType: EnumType<T>): T[] {
    return Object.values(enumType);
  }
}

/**
 * Defines the shape of an enumerated value.
 */
type EnumValue = boolean | number | string;

/**
 * Defines the shape of an enumerated type.
 */
export interface EnumType<T extends EnumValue> {

  /**
   * Gets the enumerated value corresponding to the given key.
   */
  [key: string]: T;
}
