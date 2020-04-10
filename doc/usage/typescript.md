path: blob/master
source: src/enum.ts

# Using from TypeScript

## Create the enumeration
Just create a numeric or string [enum](https://www.typescriptlang.org/docs/handbook/enums.html) as usual:

```typescript
/** Specifies the days of the week. */
enum DayOfWeek {
  sunday,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday
}
```

## Work with the enumeration

!!! warning
    The `Enum` class is not meant to be used with [heterogeneous enumerations](https://www.typescriptlang.org/docs/handbook/enums.html#heterogeneous-enums) and [`const` ones](https://www.typescriptlang.org/docs/handbook/enums.html#const-enums).

Check whether a value is defined among the enumerated type:

```typescript
import {Enum} from '@cedx/enum';

Enum.isDefined(DayOfWeek, DayOfWeek.sunday); // true
Enum.isDefined(DayOfWeek, 123); // false
```

Ensure that a value is defined among the enumerated type:

```typescript
import {Enum} from '@cedx/enum';

Enum.assert(DayOfWeek, DayOfWeek.monday); // DayOfWeek.monday
Enum.assert(DayOfWeek, 123); // (throws `TypeError`)

Enum.coerce(DayOfWeek, DayOfWeek.monday); // DayOfWeek.monday
Enum.coerce(DayOfWeek, 123); // undefined
Enum.coerce(DayOfWeek, 123, DayOfWeek.tuesday); // DayOfWeek.tuesday
```

Get the zero-based position of a value in the enumerated type declaration:

```typescript
import {Enum} from '@cedx/enum';

Enum.getIndex(DayOfWeek, DayOfWeek.wednesday); // 3
Enum.getIndex(DayOfWeek, 123); // -1
```

Get the name associated to an enumerated value:

```typescript
import {Enum} from '@cedx/enum';

Enum.getName(DayOfWeek, DayOfWeek.thursday); // "thursday"
Enum.getName(DayOfWeek, 123); // "" (empty)
```

Get information about the enumerated type:

```typescript
import {Enum} from '@cedx/enum';

Enum.entries(DayOfWeek);
// [["sunday", 0], ["monday", 1], ["tuesday", 2], ["wednesday", 3], ["thursday", 4], ["friday", 5], ["saturday", 6]]

Enum.names(DayOfWeek);
// ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

Enum.values(DayOfWeek);
// [0, 1, 2, 3, 4, 5, 6]
```
