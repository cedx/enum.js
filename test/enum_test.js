import {strict as assert} from "assert";
import {Enum} from "../lib/index.js";

/** A JavaScript enumeration providing a mixed set of scalar values. */
const SampleEnum = Enum.create({
	zero: false,
	one: 1,
	two: "TWO",
	three: 3.0
});

/** A TypeScript enumeration providing numeric values, with reverse mapping. */
let NumericEnum = {};
NumericEnum[NumericEnum["one"] = 1 << 0] = "one";
NumericEnum[NumericEnum["two"] = 1 << 1] = "two";
NumericEnum[NumericEnum["four"] = 1 << 2] = "four";
NumericEnum[NumericEnum["eight"] = 1 << 3] = "eight";

/** A TypeScript enumeration providing string values. */
const StringEnum = {
	zero: "ZERO",
	one: "ONE",
	two: "TWO",
	three: "THREE"
};

/** Tests the features of the `Enum` class. */
describe("Enum", function() {
	describe(".assert()", function() {
		it("should return the specified value if it is a known one", function() {
			assert.equal(SampleEnum.assert(false), SampleEnum.zero);
			assert.equal(SampleEnum.assert(1), SampleEnum.one);
			assert.equal(SampleEnum.assert("TWO"), SampleEnum.two);
			assert.equal(SampleEnum.assert(3.0), SampleEnum.three);

			assert.equal(Enum.assert(NumericEnum, 1), NumericEnum.one);
			assert.equal(Enum.assert(StringEnum, "ONE"), StringEnum.one);
		});

		it("should throw an exception if it is an unknown value", function() {
			assert.throws(() => SampleEnum.assert(""), TypeError);
			assert.throws(() => SampleEnum.assert("two"), TypeError);
			assert.throws(() => SampleEnum.assert(3.1), TypeError);

			assert.throws(() => Enum.assert(NumericEnum, 0), TypeError);
			assert.throws(() => Enum.assert(StringEnum, "zero"), TypeError);

			// Edge case: reverse mapping of numeric enums.
			assert.throws(() => Enum.assert(NumericEnum, "one"), TypeError);
		});
	});

	describe(".coerce()", function() {
		it("should return the specified value if it is a known one", function() {
			assert.equal(SampleEnum.coerce(false), SampleEnum.zero);
			assert.equal(SampleEnum.coerce(1), SampleEnum.one);
			assert.equal(SampleEnum.coerce("TWO"), SampleEnum.two);
			assert.equal(SampleEnum.coerce(3.0), SampleEnum.three);

			assert.equal(Enum.coerce(NumericEnum, 1), NumericEnum.one);
			assert.equal(Enum.coerce(StringEnum, "ONE"), StringEnum.one);
		});

		it("should return the default value if it is an unknown one", function() {
			assert.equal(SampleEnum.coerce(""), undefined);
			assert.equal(SampleEnum.coerce("two", false), false);
			assert.equal(SampleEnum.coerce(3.1, SampleEnum.three), SampleEnum.three);

			assert.equal(Enum.coerce(NumericEnum, 0), undefined);
			assert.equal(Enum.coerce(NumericEnum, 0, NumericEnum.eight), 8);

			assert.equal(Enum.coerce(StringEnum, "zero"), undefined);
			assert.equal(Enum.coerce(StringEnum, "zero", StringEnum.three), "THREE");

			// Edge case: reverse mapping of numeric enums.
			assert.equal(Enum.coerce(NumericEnum, "one"), undefined);
		});
	});

	describe(".create()", function() {
		it("should create types that are immutable", function() {
			assert(Object.isFrozen(SampleEnum));
		});

		it("should create types having the `Enum` mixin", function() {
			const methods = ["assert", "coerce", "entries", "getIndex", "getName", "isDefined", "names", "values"];
			assert(methods.every(method => typeof SampleEnum[method] == "function"));
		});
	});

	describe(".entries()", function() {
		it("should return the pairs of names and values of the enumerated constants", function() {
			let entries = SampleEnum.entries();
			assert.equal(entries.length, 4);

			let [tuple1, tuple2, tuple3, tuple4] = entries;
			assert.deepEqual(tuple1, ["zero", false]);
			assert.deepEqual(tuple2, ["one", 1]);
			assert.deepEqual(tuple3, ["two", "TWO"]);
			assert.deepEqual(tuple4, ["three", 3.0]);

			entries = Enum.entries(NumericEnum);
			assert.equal(entries.length, 4);

			[tuple1, tuple2, tuple3, tuple4] = entries;
			assert.deepEqual(tuple1, ["one", 1]);
			assert.deepEqual(tuple2, ["two", 2]);
			assert.deepEqual(tuple3, ["four", 4]);
			assert.deepEqual(tuple4, ["eight", 8]);

			entries = Enum.entries(StringEnum);
			assert.equal(entries.length, 4);

			[tuple1, tuple2, tuple3, tuple4] = entries;
			assert.deepEqual(tuple1, ["zero", "ZERO"]);
			assert.deepEqual(tuple2, ["one", "ONE"]);
			assert.deepEqual(tuple3, ["two", "TWO"]);
			assert.deepEqual(tuple4, ["three", "THREE"]);
		});
	});

	describe(".getIndex()", function() {
		it("should return `-1` for unknown values", function() {
			assert.equal(SampleEnum.getIndex(0), -1);
			assert.equal(SampleEnum.getIndex("two"), -1);
			assert.equal(SampleEnum.getIndex(3.1), -1);

			assert.equal(Enum.getIndex(NumericEnum, 0), -1);
			assert.equal(Enum.getIndex(StringEnum, "zero"), -1);

			// Edge case: reverse mapping of numeric enums.
			assert.equal(Enum.getIndex(NumericEnum, "one"), -1);
		});

		it("should return the index of the enumerated constant for known values", function() {
			assert.equal(SampleEnum.getIndex(false), 0);
			assert.equal(SampleEnum.getIndex(1), 1);
			assert.equal(SampleEnum.getIndex("TWO"), 2);
			assert.equal(SampleEnum.getIndex(3.0), 3);

			assert.equal(Enum.getIndex(NumericEnum, 1), 0);
			assert.equal(Enum.getIndex(StringEnum, "ONE"), 1);
		});
	});

	describe(".getName()", function() {
		it("should return an empty string for unknown values", function() {
			assert.equal(SampleEnum.getName(0).length, 0);
			assert.equal(SampleEnum.getName("two").length, 0);
			assert.equal(SampleEnum.getName(3.1).length, 0);

			assert.equal(Enum.getName(NumericEnum, 0).length, 0);
			assert.equal(Enum.getName(StringEnum, "zero").length, 0);

			// Edge case: reverse mapping of numeric enums.
			assert.equal(Enum.getName(NumericEnum, "one").length, 0);
		});

		it("should return the name for known values", function() {
			assert.equal(SampleEnum.getName(false), "zero");
			assert.equal(SampleEnum.getName(1), "one");
			assert.equal(SampleEnum.getName("TWO"), "two");
			assert.equal(SampleEnum.getName(3.0), "three");

			assert.equal(Enum.getName(NumericEnum, 1), "one");
			assert.equal(Enum.getName(StringEnum, "ONE"), "one");
		});
	});

	describe(".isDefined()", function() {
		it("should return `false` for unknown values", function() {
			assert.equal(SampleEnum.isDefined(0), false);
			assert.equal(SampleEnum.isDefined("two"), false);
			assert.equal(SampleEnum.isDefined(3.1), false);

			assert.equal(Enum.isDefined(NumericEnum, 0), false);
			assert.equal(Enum.isDefined(StringEnum, "zero"), false);

			// Edge case: reverse mapping of numeric enums.
			assert.equal(Enum.isDefined(NumericEnum, "one"), false);
		});

		it("should return `true` for known values", function() {
			assert(SampleEnum.isDefined(false));
			assert(SampleEnum.isDefined(1));
			assert(SampleEnum.isDefined("TWO"));
			assert(SampleEnum.isDefined(3.0));

			assert(Enum.isDefined(NumericEnum, 1));
			assert(Enum.isDefined(StringEnum, "ONE"));
		});
	});

	describe(".names()", function() {
		it("should return the names of the enumerable properties", function() {
			assert.deepEqual(SampleEnum.names(), ["zero", "one", "two", "three"]);
			assert.deepEqual(Enum.names(NumericEnum), ["one", "two", "four", "eight"]);
			assert.deepEqual(Enum.names(StringEnum), ["zero", "one", "two", "three"]);
		});
	});

	describe(".values()", function() {
		it("should return the values of the enumerable properties", function() {
			assert.deepEqual(SampleEnum.values(), [false, 1, "TWO", 3.0]);
			assert.deepEqual(Enum.values(NumericEnum), [1, 2, 4, 8]);
			assert.deepEqual(Enum.values(StringEnum), ["ZERO", "ONE", "TWO", "THREE"]);
		});
	});
});
