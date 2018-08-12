// @ts-ignore
import {Enum} from '@cedx/enum';

// tslint:disable:next-line: variable-name
const DayOfWeek = Enum.create<number>({
  /* tslint:disable: object-literal-sort-keys */
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6
  /* tslint:enable: object-literal-sort-keys */
});

/**
 * Works with the enumeration.
 */
function main(): void {
  // Check whether a value is defined among the enumerated type.
  DayOfWeek.isDefined(DayOfWeek.sunday); // true
  DayOfWeek.isDefined(123); // false

  // Ensure that a value is defined among the enumerated type.
  DayOfWeek.assert(DayOfWeek.monday); // DayOfWeek.monday
  DayOfWeek.assert(123); // (throws TypeError)

  DayOfWeek.coerce(DayOfWeek.monday); // DayOfWeek.monday
  DayOfWeek.coerce('bar'); // null
  DayOfWeek.coerce('baz', DayOfWeek.tuesday); // DayOfWeek.tuesday

  // Get the zero-based position of a value in the enumerated type declaration.
  DayOfWeek.getIndex(DayOfWeek.wednesday); // 3
  DayOfWeek.getIndex(123); // -1

  // Get the name associated to an enumerated value.
  DayOfWeek.getName(DayOfWeek.thursday); // "thursday"
  DayOfWeek.getName(123); // "" (empty)

  // Get information about the enumerated type.
  DayOfWeek.entries();
  // [["sunday", 0], ["monday", 1], ["tuesday", 2], ["wednesday", 3], ["thursday", 4], ["friday", 5], ["saturday", 6]]

  DayOfWeek.names();
  // ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

  DayOfWeek.values();
  // [0, 1, 2, 3, 4, 5, 6]
}
