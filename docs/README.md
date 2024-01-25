# Enums for JS

## Yet another implementation of enumerated types
This implementation provides a factory function that takes an object literal representing an enumerated type,
and augments it with helper methods to ease working with its values.

## Quick start
Install the latest version of **Enums for JS** with [npm](https://www.npmjs.com) package manager:

```shell
npm install @cedx/enum
```

For detailed instructions, see the [installation guide](installation.md).

## Usage

### Create the enumeration
Just use the `Enum()` function (or whatever you want to name it) with an object literal containing primitive values (i.e. bigints, booleans, numbers, strings and symbols):

```javascript
import Enum from "@cedx/enum";

/**
 * Defines the days of the week.
 */
const DayOfWeek = Enum({
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6
});
```

This function creates a new object from the enumerable properties of the specified one, having the same values and some additional helper methods.
The newly created object is also frozen to prevent any attempt at modifying its shape.

> Only primitive values are retained when iterating on the enumerable properties of the provided object.

### Inspect the enumeration
Check whether a value is defined among the enumerated type:

```javascript
DayOfWeek.isDefined(DayOfWeek.sunday); // true
DayOfWeek.isDefined("foo"); // false
```

Ensure that a value is defined among the enumerated type:

```javascript
DayOfWeek.assert(DayOfWeek.monday); // DayOfWeek.monday
DayOfWeek.assert("foo"); // (throws TypeError)

DayOfWeek.coerce(DayOfWeek.monday, DayOfWeek.tuesday); // DayOfWeek.monday
DayOfWeek.coerce("foo", DayOfWeek.tuesday); // DayOfWeek.tuesday
```

Get the zero-based position of a value in the enumerated type declaration:

```javascript
DayOfWeek.getIndex(DayOfWeek.wednesday); // 3
DayOfWeek.getIndex("foo"); // -1
```

Get the name associated with an enumerated value:

```javascript
DayOfWeek.getName(DayOfWeek.thursday); // "thursday"
DayOfWeek.getName("foo"); // "" (empty string)
```

Get information about the enumerated type:

```javascript
DayOfWeek.getEntries();
// Map(7) {"sunday" => 0, "monday" => 1, "tuesday" => 2, "wednesday" => 3, "thursday" => 4, "friday" => 5, "saturday" => 6}

DayOfWeek.getNames();
// ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

DayOfWeek.getValues();
// [0, 1, 2, 3, 4, 5, 6]
```

## See also
- [API reference](api/)
- [npm package](https://www.npmjs.com/package/@cedx/enum)
