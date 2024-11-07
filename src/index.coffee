import * as methods from "./implementation.js"

# The list of supported scalar types.
scalarTypes = new Set ["bigint", "boolean", "number", "string", "symbol"]

# Creates an enumeration from the specified type definition.
export Enum = (typedef) ->
	enumType = Object.create null
	Object.defineProperty enumType, key, enumerable: true, value: value for [key, value] from Object.entries typedef when scalarTypes.has typeof value
	Object.defineProperty enumType, key, value: value.bind(methods, enumType) for [key, value] from Object.entries methods
	Object.freeze enumType
