# Enums for JS
![Release](https://img.shields.io/npm/v/@cedx/enum.svg) ![License](https://img.shields.io/npm/l/@cedx/enum.svg) ![Downloads](https://img.shields.io/npm/dt/@cedx/enum.svg) ![Dependencies](https://img.shields.io/david/cedx/enum.js.svg) ![Code quality](https://img.shields.io/codacy/grade/ff5ef8040fb6456b934f8bac502747f5.svg) ![Build](https://img.shields.io/travis/cedx/enum.js.svg)

Yet another implementation of enumerated types for [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript).

This implementation does not try to reproduce the semantics of traditional enumerations, like the ones found in C# or Java languages. It just gives a set of static methods to ease working with the values of an object literal representing an enumerated type.

## Requirements
The latest [Node.js](https://nodejs.org) and [NPM](https://www.npmjs.com) versions.
If you plan to play with the sources, you will also need the latest [Gulp.js](http://gulpjs.com/) version.

## Installing via [npm](https://www.npmjs.com)
From a command prompt, run:

```shell
$ npm install --save @cedx/enum
```

## Usage

### Create the enumeration
Just use the `Enum.create()` method with an object literal containing scalar values:

```javascript
const {Enum} = require('@cedx/enum');

/**
 * Specifies the day of the week.
 * @type {object}
 */
const DayOfWeek = Enum.create({
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6
});
```

The [`Enum.create()`](https://github.com/cedx/enum.js/blob/master/src/Enum.js) method creates an anonymous class from the specified object. This class has the same values as the provided object, and some additional helper methods.

The created class has a constructor throwing an `Error`: it prohibits its instantiation. This class is also freezed to prevent any attempt at modifying its shape.

### Work with the enumeration
Check whether a value is defined among the enumerated type:

```javascript
DayOfWeek.isDefined(DayOfWeek.TUESDAY); // true
DayOfWeek.isDefined('Foo'); // false
```

Get the name associated to an enumerated value:

```javascript
DayOfWeek.getName(DayOfWeek.TUESDAY); // "TUESDAY"
DayOfWeek.getName('Bar'); // "" (empty)
```

Get information about the enumerated type:

```javascript
DayOfWeek.getNames();
// ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]

DayOfWeek.getValues();
// [0, 1, 2, 3, 4, 5, 6]
```

## See Also
- [API Reference](http://dev.belin.io/enum.js)
- [Code Quality](https://www.codacy.com/app/cedx/enum-js)
- [Continuous Integration](https://travis-ci.org/cedx/enum.js)

## License
[Enums for JS](https://github.com/cedx/enum.js) is distributed under the Apache License, version 2.0.
