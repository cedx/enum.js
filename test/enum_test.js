import assert from "node:assert/strict";
import {Enum} from "../lib/index.js";

/**
 * An enumeration providing a mixed set of scalar values.
 */
const SampleEnum = Enum.create({
	zero: false,
	one: 1,
	two: "TWO",
	three: 3.0
});

/**
 * Tests the features of the {@link Enum} class.
 */
describe("Enum", () => {
	describe(".assert()", () => {
		it("should return the specified value if it is a known one", () => {
			assert.equal(SampleEnum.assert(false), SampleEnum.zero);
			assert.equal(SampleEnum.assert(1), SampleEnum.one);
			assert.equal(SampleEnum.assert("TWO"), SampleEnum.two);
			assert.equal(SampleEnum.assert(3.0), SampleEnum.three);
		});

		it("should throw an exception if it is an unknown value", () => {
			assert.throws(() => SampleEnum.assert(""), TypeError);
			assert.throws(() => SampleEnum.assert("two"), TypeError);
			assert.throws(() => SampleEnum.assert(3.1), TypeError);
		});
	});

	describe(".coerce()", () => {
		it("should return the specified value if it is a known one", () => {
			assert.equal(SampleEnum.coerce(false), SampleEnum.zero);
			assert.equal(SampleEnum.coerce(1), SampleEnum.one);
			assert.equal(SampleEnum.coerce("TWO"), SampleEnum.two);
			assert.equal(SampleEnum.coerce(3.0), SampleEnum.three);
		});

		it("should return the default value if it is an unknown one", () => {
			assert.equal(SampleEnum.coerce(""), undefined);
			assert.equal(SampleEnum.coerce("two", false), false);
			assert.equal(SampleEnum.coerce(3.1, SampleEnum.three), SampleEnum.three);
		});
	});

	describe(".create()", () => {
		it("should create types that are immutable", () => {
			assert(Object.isFrozen(SampleEnum));
		});

		it("should create types having the `Enum` mixin", () => {
			const methods = ["assert", "coerce", "entries", "getIndex", "getName", "isDefined", "names", "values"];
			assert(methods.every(method => typeof SampleEnum[method] == "function"));
		});
	});

	describe(".entries()", () => {
		it("should return the pairs of names and values of the enumerated constants", () => {
			let entries = SampleEnum.entries();
			assert.equal(entries.length, 4);

			let [tuple1, tuple2, tuple3, tuple4] = entries;
			assert.deepEqual(tuple1, ["zero", false]);
			assert.deepEqual(tuple2, ["one", 1]);
			assert.deepEqual(tuple3, ["two", "TWO"]);
			assert.deepEqual(tuple4, ["three", 3.0]);
		});
	});

	describe(".getIndex()", () => {
		it("should return `-1` for unknown values", () => {
			assert.equal(SampleEnum.getIndex(0), -1);
			assert.equal(SampleEnum.getIndex("two"), -1);
			assert.equal(SampleEnum.getIndex(3.1), -1);
		});

		it("should return the index of the enumerated constant for known values", () => {
			assert.equal(SampleEnum.getIndex(false), 0);
			assert.equal(SampleEnum.getIndex(1), 1);
			assert.equal(SampleEnum.getIndex("TWO"), 2);
			assert.equal(SampleEnum.getIndex(3.0), 3);
		});
	});

	describe(".getName()", () => {
		it("should return an empty string for unknown values", () => {
			assert.equal(SampleEnum.getName(0).length, 0);
			assert.equal(SampleEnum.getName("two").length, 0);
			assert.equal(SampleEnum.getName(3.1).length, 0);
		});

		it("should return the name for known values", () => {
			assert.equal(SampleEnum.getName(false), "zero");
			assert.equal(SampleEnum.getName(1), "one");
			assert.equal(SampleEnum.getName("TWO"), "two");
			assert.equal(SampleEnum.getName(3.0), "three");
		});
	});

	describe(".isDefined()", () => {
		it("should return `false` for unknown values", () => {
			assert.equal(SampleEnum.isDefined(0), false);
			assert.equal(SampleEnum.isDefined("two"), false);
			assert.equal(SampleEnum.isDefined(3.1), false);
		});

		it("should return `true` for known values", () => {
			assert(SampleEnum.isDefined(false));
			assert(SampleEnum.isDefined(1));
			assert(SampleEnum.isDefined("TWO"));
			assert(SampleEnum.isDefined(3.0));
		});
	});

	describe(".names()", () => {
		it("should return the names of the enumerable properties", () => {
			assert.deepEqual(SampleEnum.names(), ["zero", "one", "two", "three"]);
		});
	});

	describe(".values()", () => {
		it("should return the values of the enumerable properties", () => {
			assert.deepEqual(SampleEnum.values(), [false, 1, "TWO", 3.0]);
		});
	});
});
