export * from "./enum.js";
import {Enum} from "./enum.js";

/**
 * Creates an enumeration from the specified type definition.
 * @template {object} T
 * @param {T} typedef A plain object defining the shape of the enumerated type.
 * @returns {Readonly<T & EnumMixin<T>>} The newly created enumeration.
 */
export default function createEnum(typedef) {
	const enumType = Object.create(null);
	const scalarTypes = ["bigint", "boolean", "number", "string", "symbol"];
	for (const [name, value] of Object.entries(typedef))
		if (scalarTypes.includes(typeof value)) Reflect.defineProperty(enumType, name, {enumerable: true, value});

	const methods = Reflect.ownKeys(Enum).map(key => Reflect.get(Enum, key)).filter(property => typeof property == "function");
	methods.forEach(method => Reflect.defineProperty(enumType, method.name, {value: method.bind(Enum, enumType)}));
	return Object.freeze(enumType);
}

/**
 * Provides methods for inspecting an enumeration.
 * @template {object} T
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
