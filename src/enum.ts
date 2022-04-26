/** A symbol indicating that an object is an enumeration. */
const isEnum = Symbol("Enum");

/**
 * Returns a value indicating whether the specified enumeration is a TypeScript one.
 * @param enumType An enumerated type.
 * @return `true` if the specified enumeration is a TypeScript one, otherwise `false`.
 */
function hasEnumSymbol(enumType: object): boolean {
	return Reflect.has(enumType, isEnum) && Reflect.get(enumType, isEnum) === true;
}

/**
 * Returns a value indicating whether the specified enumeration is a string one.
 * @param enumType An enumerated type.
 * @return `true` if the specified enumeration is a string one, otherwise `false`.
 */
function isStringEnum(enumType: object): boolean {
	return Object.values(enumType).every(value => typeof value == "string");
}

/** Provides helper methods for enumerations. */
export abstract class Enum { // eslint-disable-line @typescript-eslint/no-extraneous-class

	/**
	 * Returns the specified value if it exists in the specified enumeration, otherwise throws an exception.
	 * @param enumType An enumerated type.
	 * @param value The value to check.
	 * @return The specified enumerated constant.
	 * @throws `TypeError` No such constant was found.
	 * @typeparam T The type of the specified enumeration.
	 */
	static assert<T extends object>(enumType: T, value: any): T[keyof T] {
		if (Enum.isDefined<T>(enumType, value)) return value;
		throw new TypeError(`Invalid enumerated value: ${value}`);
	}

	/**
	 * Returns the specified value if it exists in the specified enumeration, otherwise returns the given default value.
	 * @param enumType An enumerated type.
	 * @param value The value to coerce.
	 * @param defaultValue The value to return if the specified constant does not exist.
	 * @return The specified enumerated constant, or the default value if no such constant is found.
	 * @typeparam T The type of the specified enumeration.
	 */
	static coerce<T extends object>(enumType: T, value: any, defaultValue?: T[keyof T]): T[keyof T]|undefined {
		return Enum.isDefined<T>(enumType, value) ? value : defaultValue;
	}

	/**
	 * Creates an enumeration from the specified type definition.
	 * @param typeDef An object defining the shape of the enumerated type.
	 * @return The newly created enumeration.
	 * @typeparam T The type of the enumerated values.
	 */
	static create<T extends EnumValue>(typeDef: EnumValues<T>): Readonly<EnumType<T>> {
		const enumType = {};
		Reflect.defineProperty(enumType, isEnum, {value: true});

		const scalarTypes = ["bigint", "boolean", "number", "string", "symbol"];
		for (const [name, value] of Object.entries(typeDef))
			if (scalarTypes.includes(typeof value)) Reflect.defineProperty(enumType, name, {enumerable: true, value});

		const methods = ["assert", "coerce", "entries", "getIndex", "getName", "isDefined", "names", "values"];
		for (const name of methods) {
			const method = Reflect.get(Enum, name).bind(enumType, enumType);
			Reflect.defineProperty(enumType, name, {value: method});
		}

		return Object.freeze(enumType as EnumType<T>);
	}

	/**
	 * Gets an array of the `[name, value]` pairs of the constants in the specified enumeration.
	 * @param enumType An enumerated type.
	 * @return An array that contains the `[name, value]` pairs of the constants in the specified enumeration.
	 * @typeparam T The type of the specified enumeration.
	 */
	static entries<T extends object>(enumType: T): Array<[string, T[keyof T]]> {
		return hasEnumSymbol(enumType) || isStringEnum(enumType)
			? Object.entries(enumType)
			: Enum.names(enumType).map(name => [name, Reflect.get(enumType, name)]);
	}

	/**
	 * Gets the zero-based position of the constant in the specified enumeration that has the specified value.
	 * @param enumType An enumerated type.
	 * @param value The value of a constant in the enumerated type.
	 * @return The zero-based position of the constant that has the specified value, or `-1` if no such constant is found.
	 * @typeparam T The type of the specified enumeration.
	 */
	static getIndex<T extends object>(enumType: T, value: any): number {
		return Enum.values<T>(enumType).indexOf(value);
	}

	/**
	 * Gets the name of the constant in the specified enumeration that has the specified value.
	 * @param enumType An enumerated type.
	 * @param value The value of a constant in the enumerated type.
	 * @return A string containing the name of the constant that has the specified value, or an empty string if no such constant is found.
	 * @typeparam T The type of the specified enumeration.
	 */
	static getName<T extends object>(enumType: T, value: any): string {
		const index = Enum.getIndex<T>(enumType, value);
		return index >= 0 ? Enum.names(enumType)[index] : "";
	}

	/**
	 * Gets an indication whether a constant with a specified value exists in the specified enumeration.
	 * @param enumType An enumerated type.
	 * @param value The value to check.
	 * @return `true` if a constant in the specified enumeration has the specified value, otherwise `false`.
	 * @typeparam T The type of the specified enumeration.
	 */
	static isDefined<T extends object>(enumType: T, value: any): value is T[keyof T] {
		return Enum.values<T>(enumType).includes(value);
	}

	/**
	 * Gets an array of the names of the constants in the specified enumeration.
	 * @param enumType An enumerated type.
	 * @return An array that contains the names of the constants in the specified enumeration.
	 */
	static names<T extends object>(enumType: T): string[] {
		return hasEnumSymbol(enumType) || isStringEnum(enumType)
			? Object.keys(enumType)
			: Object.values(enumType).filter(value => typeof value == "string");
	}

	/**
	 * Gets an array of the values of the constants in the specified enumeration.
	 * @param enumType An enumerated type.
	 * @return An array that contains the values of the constants in the specified enumeration.
	 * @typeparam T The type of the specified enumeration.
	 */
	static values<T extends object>(enumType: T): Array<T[keyof T]> {
		return hasEnumSymbol(enumType) || isStringEnum(enumType)
			? Object.values(enumType)
			: Object.values(enumType).filter(value => typeof value == "number");
	}
}

/**
 * Defines the methods of an enumerated type.
 * @typeparam T The type of the enumerated values.
 */
export interface EnumMethods<T extends EnumValue> {

	/**
	 * Returns the specified value if it exists in this enumeration, otherwise throws an exception.
	 * @param value The value to check.
	 * @return The specified enumerated constant.
	 * @throws `TypeError` No such constant was found.
	 */
	assert: (value: any) => T;

	/**
	 * Returns the specified value if it exists in this enumeration, otherwise returns the given default value.
	 * @param value The value to coerce.
	 * @param defaultValue The value to return if the specified constant does not exist.
	 * @return The specified enumerated constant, or the default value if no such constant is found.
	 */
	coerce: (value: any, defaultValue?: T) => T|undefined;

	/**
	 * Gets an array of the `[name, value]` pairs of the constants in this enumeration.
	 * @return An array that contains the `[name, value]` pairs of the constants in this enumeration.
	 */
	entries: () => Array<[string, T]>;

	/**
	 * Gets the zero-based position of the constant in this enumeration that has the specified value.
	 * @param value The value of a constant in this enumeration.
	 * @return The zero-based position of the constant that has the specified value, or `-1` if no such constant is found.
	 */
	getIndex: (value: any) => number;

	/**
	 * Gets the name of the constant in this enumeration that has the specified value.
	 * @param value The value of a constant in this enumeration.
	 * @return A string containing the name of the constant that has the specified value, or an empty string if no such constant is found.
	 */
	getName: (value: any) => string;

	/**
	 * Gets an indication whether a constant with a specified value exists in this enumeration.
	 * @param value The value to check.
	 * @return `true` if a constant in this enumeration has the specified value, otherwise `false`.
	 */
	isDefined: (value: any) => value is T;

	/**
	 * Gets an array of the names of the constants in this enumeration.
	 * @return An array that contains the names of the constants in this enumeration.
	 */
	names: () => string[];

	/**
	 * Gets an array of the values of the constants in this enumeration.
	 * @return An array that contains the values of the constants in this enumeration.
	 */
	values: () => T[];
}

/**
 * Defines the methods and values of an enumerated type.
 * @typeparam T The type of the enumerated values.
 */
export type EnumType<T extends EnumValue> = EnumMethods<T> & EnumValues<T>;

/** A value of an enumerated type. */
export type EnumValue = bigint|boolean|number|string;

/**
 * Defines the values of an enumerated type.
 * @typeparam T The type of the enumerated values.
 */
export type EnumValues<T extends EnumValue> = Record<string, T>;
