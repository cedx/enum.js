import * as methods from "./implementation.js";
import type {EnumType} from "./interface.js";
export type * from "./interface.js";

/**
 * The list of supported scalar types.
 */
const scalarTypes = new Set(["bigint", "boolean", "number", "string", "symbol"]);

/**
 * Creates an enumeration from the specified type definition.
 * @param typedef A plain object defining the shape of the enumerated type.
 * @returns The newly created enumeration.
 */
export function Enum<T extends object>(typedef: T): EnumType<T> & Readonly<T> {
	const enumType = Object.create(null) as EnumType<T> & T;
	for (const [key, value] of Object.entries(typedef))
		if (scalarTypes.has(typeof value)) Object.defineProperty(enumType, key, {enumerable: true, value});

	// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
	for (const [key, value] of Object.entries(methods)) Object.defineProperty(enumType, key, {value: (value as Function).bind(methods, enumType)});
	return Object.freeze(enumType);
}
