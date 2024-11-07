/**
 * Provides methods for inspecting an enumeration.
 */
export interface Enum<T extends object> {

	/**
	 * Returns the specified value if it exists in the specified enumeration, otherwise throws an error.
	 * @param value The value to check.
	 * @returns The specified value if it exists in the specified enumeration.
	 */
	assert(value: unknown): T[keyof T];

	/**
	 * Returns the specified value if it exists in the specified enumeration, otherwise returns the given default value.
	 * @param value The value to coerce.
	 * @param defaultValue The value to return if the specified value does not exist in the enumeration.
	 * @returns The specified value if it exists in the enumeration, otherwise the given default value.
	 */
	coerce(value: unknown, defaultValue: T[keyof T]): T[keyof T];

	/**
	 * Gets a map of the names and values of the constants in the specified enumeration.
	 * @returns The names and values of the constants in the enumeration.
	 */
	entries(): Map<string, T[keyof T]>;

	/**
	 * Gets the name of the constant in the specified enumeration that has the specified value.
	 * @param value The value of a constant in the enumerated type.
	 * @returns The name of the constant that has the specified value, or an empty string if no such value is found.
	 */
	getName(value: unknown): string;

	/**
	 * Gets a value indicating whether a constant with the specified name exists in the specified enumeration.
	 * @param name The name to check.
	 * @returns `true` if a constant in the specified enumeration has the specified name, otherwise `false`.
	 */
	has(name: string): boolean;

	/**
	 * Gets a value indicating whether a constant with the specified value exists in the specified enumeration.
	 * @param value The value to check.
	 * @returns `true` if a constant in the specified enumeration has the specified value, otherwise `false`.
	 */
	hasValue(value: unknown): value is T[keyof T];

	/**
	 * Gets an array of the names of the constants in the specified enumeration.
	 * @returns The names of the constants in the specified enumeration.
	 */
	keys(): Array<string>;

	/**
	 * Gets an array of the values of the constants in the specified enumeration.
	 * @returns The values of the constants in the specified enumeration.
	 */
	values(): Array<T[keyof T]>;
}
