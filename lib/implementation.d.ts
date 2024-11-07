/**
 * Returns the specified value if it exists in the specified enumeration, otherwise throws an error.
 * @param enumType An enumerated type.
 * @param value The value to check.
 * @returns The specified value if it exists in the specified enumeration.
 * @throws `TypeError` if no such enumerated value was found.
 */
export function assert<T extends object>(enumType: T, value: unknown): T[keyof T];

/**
 * Returns the specified value if it exists in the specified enumeration, otherwise returns the given default value.
 * @param enumType An enumerated type.
 * @param value The value to coerce.
 * @param defaultValue The value to return if the specified value does not exist in the enumeration.
 * @returns The specified value if it exists in the enumeration, otherwise the given default value.
 */
export function coerce<T extends object>(enumType: T, value: unknown, defaultValue: T[keyof T]): T[keyof T];

/**
 * Gets a map of the names and values of the constants in the specified enumeration.
 * @param enumType An enumerated type.
 * @returns The names and values of the constants in the enumeration.
 */
export function entries<T extends object>(enumType: T): Map<string, T[keyof T]>;

/**
 * Gets the name of the constant in the specified enumeration that has the specified value.
 * @param enumType An enumerated type.
 * @param value The value of a constant in the enumerated type.
 * @returns The name of the constant that has the specified value, or an empty string if no such value is found.
 */
export function getName(enumType: object, value: unknown): string;

/**
 * Gets a value indicating whether a constant with the specified name exists in the specified enumeration.
 * @param enumType An enumerated type.
 * @param name The name to check.
 * @returns `true` if a constant in the specified enumeration has the specified name, otherwise `false`.
 */
export function has(enumType: object, name: string): boolean;

/**
 * Gets a value indicating whether a constant with the specified value exists in the specified enumeration.
 * @param enumType An enumerated type.
 * @param value The value to check.
 * @returns `true` if a constant in the specified enumeration has the specified value, otherwise `false`.
 */
export function hasValue<T extends object>(enumType: T, value: unknown): value is T[keyof T];

/**
 * Gets an array of the names of the constants in the specified enumeration.
 * @param enumType An enumerated type.
 * @returns The names of the constants in the specified enumeration.
 */
export function keys(enumType: object): Array<string>;

/**
 * Gets an array of the values of the constants in the specified enumeration.
 * @param enumType An enumerated type.
 * @returns The values of the constants in the specified enumeration.
 */
export function values<T extends object>(enumType: T): Array<T[keyof T]>;
