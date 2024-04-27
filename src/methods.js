/**
 * Returns the specified value if it exists in the specified enumeration, otherwise throws an error.
 * @template {object} T
 * @param {T} enumType An enumerated type.
 * @param {any} value The value to check.
 * @returns {T[keyof T]} The specified value if it exists in the specified enumeration.
 * @throws `TypeError` if no such enumerated value was found.
 */
export function assert(enumType, value) {
	if (hasValue(enumType, value)) return value;
	throw TypeError(`Invalid enumerated value: ${value}`);
}

/**
 * Returns the specified value if it exists in the specified enumeration, otherwise returns the given default value.
 * @template {object} T
 * @param {T} enumType An enumerated type.
 * @param {any} value The value to coerce.
 * @param {T[keyof T]} defaultValue The value to return if the specified value does not exist in the enumeration.
 * @returns {T[keyof T]} The specified value if it exists in the enumeration, otherwise the given default value.
 */
export function coerce(enumType, value, defaultValue) {
	return hasValue(enumType, value) ? value : assert(enumType, defaultValue);
}

/**
 * Gets a map of the names and values of the constants in the specified enumeration.
 * @template {object} T
 * @param {T} enumType An enumerated type.
 * @returns {Map<string, T[keyof T]>} The names and values of the constants in the enumeration.
 */
export function entries(enumType) {
	return new Map(Object.entries(enumType));
}

/**
 * Gets the name of the constant in the specified enumeration that has the specified value.
 * @template {object} T
 * @param {T} enumType An enumerated type.
 * @param {any} value The value of a constant in the enumerated type.
 * @returns {string} The name of the constant that has the specified value, or an empty string if no such value is found.
 */
export function getName(enumType, value) {
	return keys(enumType).find(name => Reflect.get(enumType, name) === value) ?? "";
}

/**
 * Gets a value indicating whether a constant with the specified name exists in the specified enumeration.
 * @template {object} T
 * @param {T} enumType An enumerated type.
 * @param {string} name The name to check.
 * @returns {boolean} `true` if a constant in the specified enumeration has the specified name, otherwise `false`.
 */
export function has(enumType, name) {
	return keys(enumType).includes(name);
}

/**
 * Gets a value indicating whether a constant with the specified value exists in the specified enumeration.
 * @template {object} T
 * @param {T} enumType An enumerated type.
 * @param {any} value The value to check.
 * @returns {value is T[keyof T]} `true` if a constant in the specified enumeration has the specified value, otherwise `false`.
 */
export function hasValue(enumType, value) {
	return values(enumType).includes(value);
}

/**
 * Gets an array of the names of the constants in the specified enumeration.
 * @template {object} T
 * @param {T} enumType An enumerated type.
 * @returns {string[]} The names of the constants in the specified enumeration.
 */
export function keys(enumType) {
	return Object.keys(enumType);
}

/**
 * Gets an array of the values of the constants in the specified enumeration.
 * @template {object} T
 * @param {T} enumType An enumerated type.
 * @returns {T[keyof T][]} The values of the constants in the specified enumeration.
 */
export function values(enumType) {
	return Object.values(enumType);
}
