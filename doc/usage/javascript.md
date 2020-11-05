---
path: src/branch/main
source: src/enum.ts
---

# Using from JavaScript

## Create the enumeration
Just use the `Enum.create()` method with an object literal containing primitive values (i.e. bigints, booleans, numbers and strings):

``` js
import {Enum} from "@cedx/enum";

/**
 * Specifies the days of the week.
 * @enum {number}
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

This method creates an object from the enumerable properties of the specified object, having the same values as the provided object and some additional helper methods. The new object is also freezed to prevent any attempt at modifying its shape.

!!! warning
	Only primitive values (bigints, booleans, numbers and strings) are retained when iterating on the properties of the provided object.

## Work with the enumeration
Check whether a value is defined among the enumerated type:

``` js
DayOfWeek.isDefined(DayOfWeek.sunday); // true
DayOfWeek.isDefined(123); // false
```

Ensure that a value is defined among the enumerated type:

``` js
DayOfWeek.assert(DayOfWeek.monday); // DayOfWeek.monday
DayOfWeek.assert(123); // (throws `TypeError`)

DayOfWeek.coerce(DayOfWeek.monday); // DayOfWeek.monday
DayOfWeek.coerce(123); // undefined
DayOfWeek.coerce(123, DayOfWeek.tuesday); // DayOfWeek.tuesday
```

Get the zero-based position of a value in the enumerated type declaration:

``` js
DayOfWeek.getIndex(DayOfWeek.wednesday); // 3
DayOfWeek.getIndex(123); // -1
```

Get the name associated to an enumerated value:

``` js
DayOfWeek.getName(DayOfWeek.thursday); // "thursday"
DayOfWeek.getName(123); // "" (empty)
```

Get information about the enumerated type:

``` js
DayOfWeek.entries();
// [["sunday", 0], ["monday", 1], ["tuesday", 2], ["wednesday", 3], ["thursday", 4], ["friday", 5], ["saturday", 6]]

DayOfWeek.names();
// ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

DayOfWeek.values();
// [0, 1, 2, 3, 4, 5, 6]
```
