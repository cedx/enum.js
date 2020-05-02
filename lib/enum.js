/** A symbol indicating that an object is an enumeration. */
const isEnum = Symbol('Enum');
/**
 * Returns a value indicating whether the specified enumeration is a TypeScript one.
 * @param enumType An enumerated type.
 * @return `true` if the specified enumeration is a TypeScript one, otherwise `false`.
 */
function hasEnumSymbol(enumType) {
    return Reflect.has(enumType, isEnum) && Reflect.get(enumType, isEnum) === true;
}
/**
 * Returns a value indicating whether the specified enumeration is a string one.
 * @param enumType An enumerated type.
 * @return `true` if the specified enumeration is a string one, otherwise `false`.
 */
function isStringEnum(enumType) {
    return Object.values(enumType).every(value => typeof value == 'string');
}
/** Provides helper methods for enumerations. */
export class Enum {
    /**
     * Returns the specified value if it exists in the specified enumeration, otherwise throws an exception.
     * @param enumType An enumerated type.
     * @param value The value to check.
     * @return The specified enumerated constant.
     * @throws `TypeError` No such constant was found.
     * @typeparam T The type of the specified enumeration.
     */
    static assert(enumType, value) {
        if (Enum.isDefined(enumType, value))
            return value;
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
    static coerce(enumType, value, defaultValue) {
        return Enum.isDefined(enumType, value) ? value : defaultValue;
    }
    /**
     * Creates an enumeration from the specified type definition.
     * @param typeDef An object defining the shape of the enumerated type.
     * @return The newly created enumeration.
     * @typeparam T The type of the enumerated values.
     */
    static create(typeDef) {
        const enumType = {};
        Reflect.defineProperty(enumType, isEnum, { value: true });
        const scalarTypes = ['bigint', 'boolean', 'number', 'string'];
        for (const [name, value] of Object.entries(typeDef))
            if (scalarTypes.includes(typeof value))
                Reflect.defineProperty(enumType, name, { enumerable: true, value });
        const methods = ['assert', 'coerce', 'entries', 'getIndex', 'getName', 'isDefined', 'names', 'values'];
        for (const name of methods) {
            const method = Reflect.get(Enum, name).bind(enumType, enumType);
            Reflect.defineProperty(enumType, name, { value: method });
        }
        return Object.freeze(enumType);
    }
    /**
     * Gets an array of the `[name, value]` pairs of the constants in the specified enumeration.
     * @param enumType An enumerated type.
     * @return An array that contains the `[name, value]` pairs of the constants in the specified enumeration.
     * @typeparam T The type of the specified enumeration.
     */
    static entries(enumType) {
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
    static getIndex(enumType, value) {
        return Enum.values(enumType).indexOf(value);
    }
    /**
     * Gets the name of the constant in the specified enumeration that has the specified value.
     * @param enumType An enumerated type.
     * @param value The value of a constant in the enumerated type.
     * @return A string containing the name of the constant that has the specified value, or an empty string if no such constant is found.
     * @typeparam T The type of the specified enumeration.
     */
    static getName(enumType, value) {
        const index = Enum.getIndex(enumType, value);
        return index >= 0 ? Enum.names(enumType)[index] : '';
    }
    /**
     * Gets an indication whether a constant with a specified value exists in the specified enumeration.
     * @param enumType An enumerated type.
     * @param value The value to check.
     * @return `true` if a constant in the specified enumeration has the specified value, otherwise `false`.
     * @typeparam T The type of the specified enumeration.
     */
    static isDefined(enumType, value) {
        return Enum.values(enumType).includes(value);
    }
    /**
     * Gets an array of the names of the constants in the specified enumeration.
     * @param enumType An enumerated type.
     * @return An array that contains the names of the constants in the specified enumeration.
     */
    static names(enumType) {
        return hasEnumSymbol(enumType) || isStringEnum(enumType)
            ? Object.keys(enumType)
            : Object.values(enumType).filter(value => typeof value == 'string');
    }
    /**
     * Gets an array of the values of the constants in the specified enumeration.
     * @param enumType An enumerated type.
     * @return An array that contains the values of the constants in the specified enumeration.
     * @typeparam T The type of the specified enumeration.
     */
    static values(enumType) {
        return hasEnumSymbol(enumType) || isStringEnum(enumType)
            ? Object.values(enumType)
            : Object.values(enumType).filter(value => typeof value == 'number');
    }
}
