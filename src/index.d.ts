import {Enum} from "./interface.js";
export * from "./interface.js";

/**
 * Creates an enumeration from the specified type definition.
 * @param typedef A plain object defining the shape of the enumerated type.
 * @returns The newly created enumeration.
 */
export function Enum<T extends object>(typedef: T): Enum<T> & Readonly<T>;
