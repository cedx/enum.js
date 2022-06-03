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
	 * Returns the specified value if it exists in the specified enumeration, otherwise throws an exception.
	 * @param {Record<string, unknown>} enumType An enumerated type.
	 * @param {unknown} value The value to check.
	 * @returns {any} The specified enumerated constant.
	 * @throws {TypeError} No such constant was found.
	 */
	static assert(enumType, value) {
		if (Enum.isDefined(enumType, value)) return value;
		throw new TypeError(`Invalid enumerated value: ${value}`);
	}

	/**
	 * Returns the specified value if it exists in the specified enumeration, otherwise returns the given default value.
	 * @param {Record<string, unknown>} enumType An enumerated type.
	 * @param {unknown} value The value to coerce.
	 * @param {unknown} [defaultValue] The value to return if the specified constant does not exist.
	 * @returns {any} The specified enumerated constant, or the default value if no such constant is found.
	 */
	static coerce(enumType, value, defaultValue) {
		return Enum.isDefined(enumType, value) ? value : defaultValue;
	}

	/**
	 * Creates an enumeration from the specified type definition.
	 * @param {Record<string, unknown>} typedef An object defining the shape of the enumerated type.
	 * @returns {Readonly<Record<string, any> & EnumExtension>} The newly created enumeration.
	 */
	static create(typedef) {
		const enumType = Object.create(null);
		const scalarTypes = ["bigint", "boolean", "number", "string", "symbol"];
		for (const [name, value] of Object.entries(typedef))
			if (scalarTypes.includes(typeof value)) Reflect.defineProperty(enumType, name, {enumerable: true, value});

		const methods = ["assert", "coerce", "entries", "getIndex", "getName", "isDefined", "names", "values"];
		for (const name of methods) {
			const method = Reflect.get(Enum, name).bind(enumType, enumType);
			Reflect.defineProperty(enumType, name, {value: method});
		}

		return Object.freeze(enumType);
	}

	/**
	 * Gets an array of the `[name, value]` pairs of the constants in the specified enumeration.
	 * @param {Record<string, unknown>} enumType An enumerated type.
	 * @returns {Array<[string, any]>} An array that contains the `[name, value]` pairs of the constants in the specified enumeration.
	 */
	static entries(enumType) {
		return Object.entries(enumType);
	}

	/**
	 * Gets the zero-based position of the constant in the specified enumeration that has the specified value.
	 * @param {Record<string, unknown>} enumType An enumerated type.
	 * @param {unknown} value The value of a constant in the enumerated type.
	 * @returns {number} The zero-based position of the constant that has the specified value, or `-1` if no such constant is found.
	 */
	static getIndex(enumType, value) {
		return Enum.values(enumType).indexOf(value);
	}

	/**
	 * Gets the name of the constant in the specified enumeration that has the specified value.
	 * @param {Record<string, unknown>} enumType An enumerated type.
	 * @param {unknown} value The value of a constant in the enumerated type.
	 * @returns {string} A string containing the name of the constant that has the specified value, or an empty string if no such constant is found.
	 */
	static getName(enumType, value) {
		const index = Enum.getIndex(enumType, value);
		return index >= 0 ? Enum.names(enumType)[index] : "";
	}

	/**
	 * Gets a value indicating whether a constant with a specified value exists in the specified enumeration.
	 * @param {Record<string, unknown>} enumType An enumerated type.
	 * @param {unknown} value The value to check.
	 * @returns {boolean} `true` if a constant in the specified enumeration has the specified value, otherwise `false`.
	 */
	static isDefined(enumType, value) {
		return Enum.values(enumType).includes(value);
	}

	/**
	 * Gets an array of the names of the constants in the specified enumeration.
	 * @param {Record<string, unknown>} enumType An enumerated type.
	 * @returns {string[]} An array that contains the names of the constants in the specified enumeration.
	 */
	static names(enumType) {
		return Object.keys(enumType);
	}

	/**
	 * Gets an array of the values of the constants in the specified enumeration.
	 * @param {Record<string, unknown>} enumType An enumerated type.
	 * @returns {any[]} An array that contains the values of the constants in the specified enumeration.
	 */
	static values(enumType) {
		return Object.values(enumType);
	}
}

/**
 * Provides extensions methods for inspecting an enumeration.
 * @typedef {Record<string, unknown>} EnumExtension
 * @property {(enumType: Record<string, unknown>) => any} assert
 *   Returns the specified value if it exists in the specified enumeration, otherwise throws an exception.
 * @property {(enumType: Record<string, unknown>, value: unknown, defaultValue?: unknown) => any} coerce
 *   Returns the specified value if it exists in the specified enumeration, otherwise returns the given default value.
 * @property {(enumType: Record<string, unknown>) => Array<[string, any]>} entries
 *   Gets an array of the `[name, value]` pairs of the constants in the specified enumeration.
 * @property {(enumType: Record<string, unknown>, value: unknown) => number} getIndex
 *   Gets the zero-based position of the constant in the specified enumeration that has the specified value.
 * @property {(enumType: Record<string, unknown>) => string} getName
 *   Gets the name of the constant in the specified enumeration that has the specified value.
 * @property {(enumType: Record<string, unknown>) => boolean} isDefined
 *   Gets a value indicating whether a constant with a specified value exists in the specified enumeration.
 * @property {(enumType: Record<string, unknown>) => string[]} names
 *   Gets an array of the names of the constants in the specified enumeration.
 * @property {(enumType: Record<string, unknown>) => any[]} values
 *   Gets an array of the values of the constants in the specified enumeration.
 */
