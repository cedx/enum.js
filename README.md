# Enums for JS
![Runtime](https://img.shields.io/badge/node-%3E%3D8.9-brightgreen.svg) ![Release](https://img.shields.io/npm/v/@cedx/enum.svg) ![License](https://img.shields.io/npm/l/@cedx/enum.svg) ![Downloads](https://img.shields.io/npm/dt/@cedx/enum.svg) ![Dependencies](https://david-dm.org/cedx/enum.js.svg) ![Coverage](https://coveralls.io/repos/github/cedx/enum.js/badge.svg) ![Build](https://travis-ci.org/cedx/enum.js.svg)

Yet another implementation of enumerated types for [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript).

This implementation does not try to reproduce the semantics of traditional enumerations, like the ones found in C# or Java languages. It just gives a set of static methods to ease working with the values of an object literal representing an enumerated type.

## Requirements
The latest [Node.js](https://nodejs.org) and [npm](https://www.npmjs.com) versions.
If you plan to play with the sources, you will also need the latest [Gulp](http://gulpjs.com) version.

## Installing via [npm](https://www.npmjs.com)
From a command prompt, run:

```shell
$ npm install --save @cedx/enum
```

## Usage

### Create the enumeration
Just use the `Enum.create()` method with an object literal containing scalar values (e.g. only booleans, numbers and strings):

```javascript
const {Enum} = require('@cedx/enum');

/**
 * Specifies the day of the week.
 * @type {object}
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

The [`Enum.create()`](https://github.com/cedx/enum.js/blob/master/lib/enum.js) method creates an anonymous class from the specified object. This class has the same values as the provided object, and some additional helper methods.

The created class has a constructor throwing a `TypeError`: it prohibits its instantiation. This class is also freezed to prevent any attempt at modifying its shape.

### Work with the enumeration
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
DayOfWeek.getEntries();
// [["sunday", 0], ["monday", 1], ["tuesday", 2], ["wednesday", 3], ["thursday", 4], ["friday", 5], ["saturday", 6]]

DayOfWeek.getNames();
// ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

DayOfWeek.getValues();
// [0, 1, 2, 3, 4, 5, 6]
```

## See also
- [API reference](https://cedx.github.io/enum.js)
- [Code coverage](https://coveralls.io/github/cedx/enum.js)
- [Continuous integration](https://travis-ci.org/cedx/enum.js)

## License
[Enums for JS](https://github.com/cedx/enum.js) is distributed under the MIT License.
