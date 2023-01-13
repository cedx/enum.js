/**
 * Provides helper methods for enumerations.
 * @abstract
 */
export class Enum {

	/**
	 * Creates a new enumeration.
	 * @private
	 */
	constructor() {
		throw TypeError("The Enum class is abstract.");
	}

	/**
	 * Returns the specified value if it exists in the specified enumeration, otherwise throws an error.
	 * @template {object} T
	 * @param {T} enumType An enumerated type.
	 * @param {any} value The value to check.
	 * @returns {T[keyof T]} The specified value if it exists in the specified enumeration.
	 * @throws {TypeError} No such enumerated value was found.
	 */
	static assert(enumType, value) {
		if (this.isDefined(enumType, value)) return value;
		throw TypeError(`Invalid enumerated value: ${value}`);
	}

	/**
	 * Returns the specified value if it exists in the specified enumeration, otherwise returns the given default value.
	 * @template {object} T
	 * @param {T} enumType An enumerated type.
	 * @param {any} value The value to coerce.
	 * @param {T[keyof T]} defaultValue The value to return if the specified value does not exist in the enumeration.
	 * @returns {T[keyof T]} The specified value if it exists in the enumeration, otherwise the given default value.
	 */
	static coerce(enumType, value, defaultValue) {
		return this.isDefined(enumType, value) ? value : this.assert(enumType, defaultValue);
	}

	/**
	 * Gets a map of the names and values of the constants in the specified enumeration.
	 * @template {object} T
	 * @param {T} enumType An enumerated type.
	 * @returns {Map<string, T[keyof T]>} The names and values of the constants in the enumeration.
	 */
	static getEntries(enumType) {
		return new Map(Object.entries(enumType));
	}

	/**
	 * Gets the zero-based position of the constant in the specified enumeration that has the specified value.
	 * @param {any} enumType An enumerated type.
	 * @param {any} value The value of a constant in the enumerated type.
	 * @returns {number} The zero-based position of the constant that has the specified value, or `-1` if no such value is found.
	 */
	static getIndex(enumType, value) {
		return this.getValues(enumType).indexOf(value);
	}

	/**
	 * Gets the name of the constant in the specified enumeration that has the specified value.
	 * @param {any} enumType An enumerated type.
	 * @param {any} value The value of a constant in the enumerated type.
	 * @returns {string} The name of the constant that has the specified value, or an empty string if no such value is found.
	 */
	static getName(enumType, value) {
		return this.getNames(enumType).find(name => Reflect.get(enumType, name) === value) ?? "";
	}

	/**
	 * Gets an array of the names of the constants in the specified enumeration.
	 * @param {any} enumType An enumerated type.
	 * @returns {string[]} The names of the constants in the specified enumeration.
	 */
	static getNames(enumType) {
		return Object.keys(enumType);
	}

	/**
	 * Gets an array of the values of the constants in the specified enumeration.
	 * @template {object} T
	 * @param {T} enumType An enumerated type.
	 * @returns {Array<T[keyof T]>} The values of the constants in the specified enumeration.
	 */
	static getValues(enumType) {
		return Object.values(enumType);
	}

	/**
	 * Gets a value indicating whether a constant with a specified value exists in the specified enumeration.
	 * @template {object} T
	 * @param {T} enumType An enumerated type.
	 * @param {any} value The value to check.
	 * @returns {value is T[keyof T]} `true` if a constant in the specified enumeration has the specified value, otherwise `false`.
	 */
	static isDefined(enumType, value) {
		return this.getValues(enumType).includes(value);
	}
}
