/* eslint-disable capitalized-comments, line-comment-position, new-cap */
import Enum from "@cedx/enum";

// Defines the days of the week.
const DayOfWeek = Enum({
	sunday: 0,
	monday: 1,
	tuesday: 2,
	wednesday: 3,
	thursday: 4,
	friday: 5,
	saturday: 6
});

// Check whether a value is defined among the enumerated type.
DayOfWeek.isDefined(DayOfWeek.sunday); // true
DayOfWeek.isDefined("foo"); // false

// Ensure that a value is defined among the enumerated type.
DayOfWeek.assert(DayOfWeek.monday); // DayOfWeek.monday
DayOfWeek.assert("foo"); // (throws TypeError)
DayOfWeek.coerce(DayOfWeek.monday, DayOfWeek.tuesday); // DayOfWeek.monday
DayOfWeek.coerce("foo", DayOfWeek.tuesday); // DayOfWeek.tuesday

// Get the zero-based position of a value in the enumerated type.
DayOfWeek.getIndex(DayOfWeek.wednesday); // 3
DayOfWeek.getIndex("foo"); // -1

// Get the name associated with an enumerated value.
DayOfWeek.getName(DayOfWeek.thursday); // "thursday"
DayOfWeek.getName("foo"); // "" (empty string)

// Get information about the enumerated type.
DayOfWeek.getEntries(); // Map(7) {"sunday" => 0, "monday" => 1, "tuesday" => 2, "wednesday" => 3, "thursday" => 4, "friday" => 5, "saturday" => 6}
DayOfWeek.getNames(); // ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
DayOfWeek.getValues(); // [0, 1, 2, 3, 4, 5, 6]
