path: blob/master/lib
source: enum.js
# Usage

## Create the enumeration
Just use the `Enum.create()` method with an object literal containing scalar values (i.e. only booleans, numbers and strings):

```javascript
const {Enum} = require('@cedx/enum');

/**
 * Specifies the day of the week.
 * @type {Object}
 */
const DayOfWeek = Enum.create({
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6
});
```

This method creates an anonymous class from the specified object.
This class has the same values as the provided object, and some additional helper methods.

The created class has a constructor throwing a `TypeError`: it prohibits its instantiation.
This class is also freezed to prevent any attempt at modifying its shape.

## Work with the enumeration
Check whether a value is defined among the enumerated type:

```javascript
DayOfWeek.isDefined(DayOfWeek.sunday); // true
DayOfWeek.isDefined('foo'); // false
```

Ensure that a value is defined among the enumerated type:

```javascript
DayOfWeek.assert(DayOfWeek.monday); // DayOfWeek.monday
DayOfWeek.assert('foo'); // (throws TypeError)

DayOfWeek.coerce(DayOfWeek.monday); // DayOfWeek.monday
DayOfWeek.coerce('bar'); // null
DayOfWeek.coerce('baz', DayOfWeek.tuesday); // DayOfWeek.tuesday
```

Get the zero-based position of a value in the enumerated type declaration:

```javascript
DayOfWeek.getIndex(DayOfWeek.wednesday); // 3
DayOfWeek.getIndex('foo'); // -1
```

Get the name associated to an enumerated value:

```javascript
DayOfWeek.getName(DayOfWeek.thursday); // "thursday"
DayOfWeek.getName('foo'); // "" (empty)
```

Get information about the enumerated type:

```javascript
DayOfWeek.entries();
// [["sunday", 0], ["monday", 1], ["tuesday", 2], ["wednesday", 3], ["thursday", 4], ["friday", 5], ["saturday", 6]]

DayOfWeek.names();
// ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

DayOfWeek.values();
// [0, 1, 2, 3, 4, 5, 6]
```
