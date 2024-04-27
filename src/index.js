import * as methods from "./methods.js";

/**
 * Creates an enumeration from the specified type definition.
 * @template {object} T
 * @param {T} typedef A plain object defining the shape of the enumerated type.
 * @returns {Readonly<Enum<T> & T>} The newly created enumeration.
 */
export default function createEnum(typedef) {
	const enumType = Object.create(null);

	const scalarTypes = ["bigint", "boolean", "number", "string", "symbol"];
	for (const [key, value] of Object.entries(typedef))
		if (scalarTypes.includes(typeof value)) Reflect.defineProperty(enumType, key, {enumerable: true, value});

	for (const [key, value] of Object.entries(methods))
		Reflect.defineProperty(enumType, key, {value: /** @type {Function} */ (value).bind(methods, enumType)});

	return Object.freeze(enumType);
}

/**
 * Provides methods for inspecting an enumeration.
 * @template {object} T
 * @typedef {object} Enum
 * @property {(value: any) => T[keyof T]} assert
 *   Returns the specified value if it exists in the specified enumeration, otherwise throws an error.
 * @property {(value: any, defaultValue: T[keyof T]) => T[keyof T]} coerce
 *   Returns the specified value if it exists in the specified enumeration, otherwise returns the given default value.
 * @property {() => Map<string, T[keyof T]>} entries
 *   Gets a map of the names and values of the constants in the specified enumeration.
 * @property {(value: any) => string} getName
 *   Gets the name of the constant in the specified enumeration that has the specified value.
 * @property {(name: string) => boolean} has
 *   Gets a value indicating whether a constant with the specified name exists in the specified enumeration.
 * @property {(value: any) => value is T[keyof T]} hasValue
 *   Gets a value indicating whether a constant with the specified value exists in the specified enumeration.
 * @property {() => string[]} keys
 *   Gets an array of the names of the constants in the specified enumeration.
 * @property {() => T[keyof T][]} values
 *   Gets an array of the values of the constants in the specified enumeration.
 */
