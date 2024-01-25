/**
 * Returns the specified value if it exists in the specified enumeration, otherwise throws an error.
 * @param enumType An enumerated type.
 * @param value The value to check.
 * @returns The specified value if it exists in the specified enumeration.
 * @throws `TypeError` if no such enumerated value was found.
 */
export function assert<T extends object>(enumType: T, value: unknown): T[keyof T] {
	if (isDefined(enumType, value)) return value;
	throw TypeError(`Invalid enumerated value: ${value}`);
}

/**
 * Returns the specified value if it exists in the specified enumeration, otherwise returns the given default value.
 * @param enumType An enumerated type.
 * @param value The value to coerce.
 * @param defaultValue The value to return if the specified value does not exist in the enumeration.
 * @returns The specified value if it exists in the enumeration, otherwise the given default value.
 */
export function coerce<T extends object>(enumType: T, value: unknown, defaultValue: T[keyof T]): T[keyof T] {
	return isDefined(enumType, value) ? value : assert(enumType, defaultValue);
}

/**
 * Gets a map of the names and values of the constants in the specified enumeration.
 * @param enumType An enumerated type.
 * @returns The names and values of the constants in the enumeration.
 */
export function getEntries<T extends object>(enumType: T): Map<string, T[keyof T]> {
	return new Map(Object.entries(enumType));
}

/**
 * Gets the zero-based position of the constant in the specified enumeration that has the specified value.
 * @param enumType An enumerated type.
 * @param value The value of a constant in the enumerated type.
 * @returns The zero-based position of the constant that has the specified value, or `-1` if no such value is found.
 */
export function getIndex<T extends object>(enumType: T, value: unknown): number {
	return getValues(enumType).indexOf(value as any);
}

/**
 * Gets the name of the constant in the specified enumeration that has the specified value.
 * @param enumType An enumerated type.
 * @param value The value of a constant in the enumerated type.
 * @returns The name of the constant that has the specified value, or an empty string if no such value is found.
 */
export function getName<T extends object>(enumType: T, value: unknown): string {
	return getNames(enumType).find(name => Reflect.get(enumType, name) === value) ?? "";
}

/**
 * Gets an array of the names of the constants in the specified enumeration.
 * @param enumType An enumerated type.
 * @returns The names of the constants in the specified enumeration.
 */
export function getNames<T extends object>(enumType: T): string[] {
	return Object.keys(enumType);
}

/**
 * Gets an array of the values of the constants in the specified enumeration.
 * @param enumType An enumerated type.
 * @returns The values of the constants in the specified enumeration.
 */
export function getValues<T extends object>(enumType: T): T[keyof T][] {
	return Object.values(enumType);
}

/**
 * Gets a value indicating whether a constant with a specified value exists in the specified enumeration.
 * @param enumType An enumerated type.
 * @param value The value to check.
 * @returns `true` if a constant in the specified enumeration has the specified value, otherwise `false`.
 */
export function isDefined<T extends object>(enumType: T, value: unknown): value is T[keyof T] {
	return getValues(enumType).includes(value as any);
}
