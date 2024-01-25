export * from "./interface.js";
import * as methods from "./implementation.js";
import type {Enum} from "./interface.js";

/**
 * Creates an enumeration from the specified type definition.
 * @param typedef A plain object defining the shape of the enumerated type.
 * @returns The newly created enumeration.
 */
export default function createEnum<T extends object>(typedef: T): Readonly<Enum<T> & T> {
	const enumType = Object.create(null);
	const scalarTypes = ["bigint", "boolean", "number", "string", "symbol"];
	for (const [key, value] of Object.entries(typedef))
		if (scalarTypes.includes(typeof value)) Reflect.defineProperty(enumType, key, {enumerable: true, value});

	Object.keys(methods)
		.map(key => Reflect.get(methods, key))
		.forEach(method => Reflect.defineProperty(enumType, method.name, {value: method.bind(null, enumType)}));

	return Object.freeze(enumType);
}
