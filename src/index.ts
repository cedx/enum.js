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

	const scalarTypes = new Set(["bigint", "boolean", "number", "string", "symbol"]);
	for (const [key, value] of Object.entries(typedef))
		if (scalarTypes.has(typeof value)) Reflect.defineProperty(enumType, key, {enumerable: true, value});

	for (const [key, value] of Object.entries(methods))
		Reflect.defineProperty(enumType, key, {value: (value as Function).bind(methods, enumType)});

	return Object.freeze(enumType);
}
