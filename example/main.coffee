import Enum from "@cedx/enum"

# Defines the days of the week.
DayOfWeek = Enum
	sunday: 0
	monday: 1
	tuesday: 2
	wednesday: 3
	thursday: 4
	friday: 5
	saturday: 6

# Check whether a name is defined among the enumerated type.
DayOfWeek.has "sunday" # yes
DayOfWeek.has "foo" # no

# Check whether a value is defined among the enumerated type.
DayOfWeek.hasValue DayOfWeek.sunday # yes
DayOfWeek.hasValue "foo" # no

# Ensure that a value is defined among the enumerated type.
DayOfWeek.assert DayOfWeek.monday # DayOfWeek.monday
DayOfWeek.assert "foo" # (throws TypeError)
DayOfWeek.coerce DayOfWeek.monday, DayOfWeek.tuesday # DayOfWeek.monday
DayOfWeek.coerce "foo", DayOfWeek.tuesday # DayOfWeek.tuesday

# Get the name associated with an enumerated value.
DayOfWeek.getName DayOfWeek.thursday # "thursday"
DayOfWeek.getName "foo" # "" (empty string)

# Get information about the enumerated type.
DayOfWeek.entries() # Map(7) {"sunday" => 0, "monday" => 1, "tuesday" => 2, "wednesday" => 3, "thursday" => 4, "friday" => 5, "saturday" => 6}
DayOfWeek.keys() # ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
DayOfWeek.values() # [0, 1, 2, 3, 4, 5, 6]
