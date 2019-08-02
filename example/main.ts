/* eslint-disable @typescript-eslint/no-unused-vars */

// @ts-ignore
import {Enum} from '@cedx/enum';

/** Specifies the days of the week. */
const DayOfWeek = Enum.create({
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6
});

/** Works with the enumeration. */
function main() {
  // Check whether a value is defined among the enumerated type.
  console.log(DayOfWeek.isDefined(DayOfWeek.sunday)); // true
  console.log(DayOfWeek.isDefined(123)); // false

  // Ensure that a value is defined among the enumerated type.
  console.log(DayOfWeek.assert(DayOfWeek.monday)); // DayOfWeek.monday
  DayOfWeek.assert(123); // (throws TypeError)

  console.log(DayOfWeek.coerce(DayOfWeek.monday)); // DayOfWeek.monday
  console.log(DayOfWeek.coerce(123)); // null
  console.log(DayOfWeek.coerce(123, DayOfWeek.tuesday)); // DayOfWeek.tuesday

  // Get the zero-based position of a value in the enumerated type declaration.
  console.log(DayOfWeek.getIndex(DayOfWeek.wednesday)); // 3
  console.log(DayOfWeek.getIndex(123)); // -1

  // Get the name associated to an enumerated value.
  console.log(DayOfWeek.getName(DayOfWeek.thursday)); // "thursday"
  console.log(DayOfWeek.getName(123)); // "" (empty)

  // Get information about the enumerated type.
  console.log(DayOfWeek.entries());
  // [["sunday", 0], ["monday", 1], ["tuesday", 2], ["wednesday", 3], ["thursday", 4], ["friday", 5], ["saturday", 6]]

  console.log(DayOfWeek.names());
  // ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

  console.log(DayOfWeek.values());
  // [0, 1, 2, 3, 4, 5, 6]
}
