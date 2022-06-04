/**
 * Provides helper methods for enumerations.
 * @abstract
 */
export class Enum {

	/**
	 * Creates a new enumeration.
	 * @throws {TypeError} This class is abstract.
	 */
	constructor() {
		throw new TypeError("The Enum class is abstract.");
	}

	/**
	 * Returns the specified value if it exists in the specified enumeration, otherwise throws an error.
	 * @template T
	 * @param {T} enumType An enumerated type.
	 * @param {any} value The value to check.
	 * @returns {T[keyof T]} The specified value if it exists in the specified enumeration.
	 * @throws {TypeError} No such enumerated value was found.
	 */
	static assert(enumType, value) {
		if (Enum.isDefined(enumType, value)) return value;
		throw new TypeError(`Invalid enumerated value: ${value}`);
	}

	/**
	 * Returns the specified value if it exists in the specified enumeration, otherwise returns the given default value.
	 * @template T
	 * @param {T} enumType An enumerated type.
	 * @param {any} value The value to coerce.
	 * @param {T[keyof T]} defaultValue The value to return if the specified value does not exist in the enumeration.
	 * @returns {T[keyof T]} The specified value if it exists in the enumeration, otherwise the given default value.
	 */
	static coerce(enumType, value, defaultValue) {
		return Enum.isDefined(enumType, value) ? value : Enum.assert(enumType, defaultValue);
	}

	/**
	 * Creates an enumeration from the specified type definition.
	 * @template T
	 * @param {T} typedef A plain object defining the shape of the enumerated type.
	 * @returns {Readonly<T & EnumMixin<T>>} The newly created enumeration.
	 */
	static create(typedef) {
		const enumType = Object.create(null);
		const scalarTypes = ["bigint", "boolean", "number", "string", "symbol"];
		for (const [name, value] of Object.entries(typedef))
			if (scalarTypes.includes(typeof value)) Reflect.defineProperty(enumType, name, {enumerable: true, value});

		const methods = ["assert", "coerce", "getEntries", "getIndex", "getName", "getNames", "getValues", "isDefined"];
		for (const name of methods) {
			const method = Reflect.get(Enum, name).bind(enumType, enumType);
			Reflect.defineProperty(enumType, name, {value: method});
		}

		return Object.freeze(enumType);
	}

	/**
	 * Gets a map of the names and values of the constants in the specified enumeration.
	 * @template T
	 * @param {T} enumType An enumerated type.
	 * @returns {Map<string, T[keyof T]>} The names and values of the constants in the enumeration.
	 */
	static getEntries(enumType) {
		return new Map(Object.entries(enumType));
	}

	/**
	 * Gets the zero-based position of the constant in the specified enumeration that has the specified value.
	 * @template T
	 * @param {T} enumType An enumerated type.
	 * @param {any} value The value of a constant in the enumerated type.
	 * @returns {number} The zero-based position of the constant that has the specified value, or `-1` if no such value is found.
	 */
	static getIndex(enumType, value) {
		return Enum.getValues(enumType).indexOf(value);
	}

	/**
	 * Gets the name of the constant in the specified enumeration that has the specified value.
	 * @template T
	 * @param {T} enumType An enumerated type.
	 * @param {any} value The value of a constant in the enumerated type.
	 * @returns {string} The name of the constant that has the specified value, or an empty string if no such value is found.
	 */
	static getName(enumType, value) {
		const index = Enum.getIndex(enumType, value);
		return index >= 0 ? Enum.getNames(enumType)[index] : "";
	}

	/**
	 * Gets an array of the names of the constants in the specified enumeration.
	 * @template T
	 * @param {T} enumType An enumerated type.
	 * @returns {string[]} The names of the constants in the specified enumeration.
	 */
	static getNames(enumType) {
		return Object.keys(enumType);
	}

	/**
	 * Gets an array of the values of the constants in the specified enumeration.
	 * @template T
	 * @param {T} enumType An enumerated type.
	 * @returns {Array<T[keyof T]>} The values of the constants in the specified enumeration.
	 */
	static getValues(enumType) {
		return Object.values(enumType);
	}

	/**
	 * Gets a value indicating whether a constant with a specified value exists in the specified enumeration.
	 * @template T
	 * @param {T} enumType An enumerated type.
	 * @param {any} value The value to check.
	 * @returns {value is T[keyof T]} `true` if a constant in the specified enumeration has the specified value, otherwise `false`.
	 */
	static isDefined(enumType, value) {
		return Enum.getValues(enumType).includes(value);
	}
}

/**
 * Provides methods for inspecting an enumeration.
 * @template T
 * @typedef {object} EnumMixin
 * @property {(value: any) => T[keyof T]} assert
 *   Returns the specified value if it exists in this enumeration, otherwise throws an error.
 * @property {(value: any, defaultValue: T[keyof T]) => T[keyof T]} coerce
 *   Returns the specified value if it exists in this enumeration, otherwise returns the given default value.
 * @property {() => Map<string, T[keyof T]>} getEntries
 *   Gets a map of the names and values of the constants in this enumeration.
 * @property {(value: any) => number} getIndex
 *   Gets the zero-based position of the constant in this enumeration that has the specified value.
 * @property {(value: any) => string} getName
 *   Gets the name of the constant in this enumeration that has the specified value.
 * @property {() => string[]} getNames
 *   Gets an array of the names of the constants in this enumeration.
 * @property {() => Array<T[keyof T]>} getValues
 *   Gets an array of the values of the constants in this enumeration.
 * @property {(value: any) => value is T[keyof T]} isDefined
 *   Gets a value indicating whether a constant with a specified value exists in this enumeration.
 */
