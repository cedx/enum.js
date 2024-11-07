# Returns the specified value if it exists in the specified enumeration, otherwise throws an error.
export assert = (enumType, value) ->
	if hasValue enumType, value then value else throw TypeError "Invalid enumerated value: #{value}"

# Returns the specified value if it exists in the specified enumeration, otherwise returns the given default value.
export coerce = (enumType, value, defaultValue) ->
	if hasValue enumType, value then value else assert enumType, defaultValue

# Gets a map of the names and values of the constants in the specified enumeration.
export entries = (enumType) -> new Map Object.entries enumType

# Gets the name of the constant in the specified enumeration that has the specified value.
export getName = (enumType, value) -> keys(enumType).find((name) -> enumType[name] is value) ? ""

# Gets a value indicating whether a constant with the specified name exists in the specified enumeration.
export has = (enumType, name) -> keys(enumType).includes name

# Gets a value indicating whether a constant with the specified value exists in the specified enumeration.
export hasValue = (enumType, value) -> values(enumType).includes value

# Gets an array of the names of the constants in the specified enumeration.
export keys = (enumType) -> Object.keys enumType

# Gets an array of the values of the constants in the specified enumeration.
export values = (enumType) -> Object.values enumType
