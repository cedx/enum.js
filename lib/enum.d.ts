/** Provides helper methods for enumerations. */
export declare abstract class Enum {
    /**
     * Returns the specified value if it exists in the specified enumeration, otherwise throws an exception.
     * @param enumType An enumerated type.
     * @param value The value to check.
     * @return The specified enumerated constant.
     * @throws [[TypeError]] No such constant was found.
     * @typeparam T The type of the specified enumeration.
     */
    static assert<T extends object>(enumType: T, value: any): T[keyof T];
    /**
     * Returns the specified value if it exists in the specified enumeration, otherwise returns the given default value.
     * @param enumType An enumerated type.
     * @param value The value to coerce.
     * @param defaultValue The value to return if the specified constant does not exist.
     * @return The specified enumerated constant, or the default value if no such constant is found.
     * @typeparam T The type of the specified enumeration.
     */
    static coerce<T extends object>(enumType: T, value: any, defaultValue?: T[keyof T]): T[keyof T] | undefined;
    /**
     * Creates an enumeration from the specified type definition.
     * @param typeDef An object defining the shape of the enumerated type.
     * @return The newly created enumeration.
     * @typeparam T The type of the enumerated values.
     */
    static create<T extends EnumValue>(typeDef: EnumValues<T>): Readonly<EnumType<T>>;
    /**
     * Gets an array of the `[name, value]` pairs of the constants in the specified enumeration.
     * @param enumType An enumerated type.
     * @return An array that contains the `[name, value]` pairs of the constants in the specified enumeration.
     * @typeparam T The type of the specified enumeration.
     */
    static entries<T extends object>(enumType: T): Array<[string, T[keyof T]]>;
    /**
     * Gets the zero-based position of the constant in the specified enumeration that has the specified value.
     * @param enumType An enumerated type.
     * @param value The value of a constant in the enumerated type.
     * @return The zero-based position of the constant that has the specified value, or `-1` if no such constant is found.
     * @typeparam T The type of the specified enumeration.
     */
    static getIndex<T extends object>(enumType: T, value: any): number;
    /**
     * Gets the name of the constant in the specified enumeration that has the specified value.
     * @param enumType An enumerated type.
     * @param value The value of a constant in the enumerated type.
     * @return A string containing the name of the constant that has the specified value, or an empty string if no such constant is found.
     * @typeparam T The type of the specified enumeration.
     */
    static getName<T extends object>(enumType: T, value: any): string;
    /**
     * Gets an indication whether a constant with a specified value exists in the specified enumeration.
     * @param enumType An enumerated type.
     * @param value The value to check.
     * @return `true` if a constant in the specified enumeration has the specified value, otherwise `false`.
     * @typeparam T The type of the specified enumeration.
     */
    static isDefined<T extends object>(enumType: T, value: any): value is T[keyof T];
    /**
     * Gets an array of the names of the constants in the specified enumeration.
     * @param enumType An enumerated type.
     * @return An array that contains the names of the constants in the specified enumeration.
     */
    static names(enumType: object): string[];
    /**
     * Gets an array of the values of the constants in the specified enumeration.
     * @param enumType An enumerated type.
     * @return An array that contains the values of the constants in the specified enumeration.
     * @typeparam T The type of the specified enumeration.
     */
    static values<T extends object>(enumType: T): Array<T[keyof T]>;
}
/**
 * Defines the methods of an enumerated type.
 * @typeparam T The type of the enumerated values.
 */
export interface EnumMethods<T extends EnumValue> {
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
     * @param defaultValue The value to return if the specified constant does not exist.
     * @return The specified enumerated constant, or the default value if no such constant is found.
     */
    coerce(value: any, defaultValue?: T): T | undefined;
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
/**
 * Defines the methods and values of an enumerated type.
 * @typeparam T The type of the enumerated values.
 */
export declare type EnumType<T extends EnumValue> = EnumMethods<T> & EnumValues<T>;
/** A value of an enumerated type. */
export declare type EnumValue = bigint | boolean | number | string;
/**
 * Defines the values of an enumerated type.
 * @typeparam T The type of the enumerated values.
 */
export declare type EnumValues<T extends EnumValue> = Record<string, T>;
