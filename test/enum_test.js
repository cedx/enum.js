/* eslint-disable max-lines-per-function */
import assert from "node:assert/strict";
import {describe, it} from "node:test";
import {Enum} from "#enum";

/**
 * A sample enumeration.
 * @enum {boolean|number|string}
 */
const SampleEnum = Object.freeze({
	zero: false,
	one: 1,
	two: "TWO",
	three: 3.0
});

/**
 * Tests the features of the {@link Enum} class.
 */
describe("Enum", () => {
	describe("assert()", () => {
		it("should return the specified value if it is a known one", () => {
			assert.equal(Enum.assert(SampleEnum, false), SampleEnum.zero);
			assert.equal(Enum.assert(SampleEnum, 1), SampleEnum.one);
			assert.equal(Enum.assert(SampleEnum, "TWO"), SampleEnum.two);
			assert.equal(Enum.assert(SampleEnum, 3.0), SampleEnum.three);
		});

		it("should throw an exception if it is an unknown value", () => {
			assert.throws(() => Enum.assert(SampleEnum, ""), TypeError);
			assert.throws(() => Enum.assert(SampleEnum, "two"), TypeError);
			assert.throws(() => Enum.assert(SampleEnum, 3.1), TypeError);
		});
	});

	describe("coerce()", () => {
		it("should return the specified value if it is a known one", () => {
			assert.equal(Enum.coerce(SampleEnum, false, SampleEnum.zero), SampleEnum.zero);
			assert.equal(Enum.coerce(SampleEnum, 1, SampleEnum.zero), SampleEnum.one);
			assert.equal(Enum.coerce(SampleEnum, "TWO", SampleEnum.zero), SampleEnum.two);
			assert.equal(Enum.coerce(SampleEnum, 3.0, SampleEnum.zero), SampleEnum.three);
		});

		it("should return the default value if it is an unknown one", () => {
			assert.equal(Enum.coerce(SampleEnum, "", SampleEnum.zero), SampleEnum.zero);
			assert.equal(Enum.coerce(SampleEnum, "two", SampleEnum.two), SampleEnum.two);
			assert.equal(Enum.coerce(SampleEnum, 3.1, SampleEnum.two), SampleEnum.two);
		});
	});

	describe("getEntries()", () => {
		it("should return the pairs of names and values", () => {
			const entries = Enum.getEntries(SampleEnum);
			assert.equal(entries.size, 4);

			const [tuple1, tuple2, tuple3, tuple4] = entries;
			assert.deepEqual(tuple1, ["zero", false]);
			assert.deepEqual(tuple2, ["one", 1]);
			assert.deepEqual(tuple3, ["two", "TWO"]);
			assert.deepEqual(tuple4, ["three", 3.0]);
		});
	});

	describe("getIndex()", () => {
		it("should return `-1` for unknown values", () => {
			assert.equal(Enum.getIndex(SampleEnum, 0), -1);
			assert.equal(Enum.getIndex(SampleEnum, "two"), -1);
			assert.equal(Enum.getIndex(SampleEnum, 3.1), -1);
		});

		it("should return the index for known values", () => {
			assert.equal(Enum.getIndex(SampleEnum, false), 0);
			assert.equal(Enum.getIndex(SampleEnum, 1), 1);
			assert.equal(Enum.getIndex(SampleEnum, "TWO"), 2);
			assert.equal(Enum.getIndex(SampleEnum, 3.0), 3);
		});
	});

	describe("getName()", () => {
		it("should return an empty string for unknown values", () => {
			assert.equal(Enum.getName(SampleEnum, 0).length, 0);
			assert.equal(Enum.getName(SampleEnum, "two").length, 0);
			assert.equal(Enum.getName(SampleEnum, 3.1).length, 0);
		});

		it("should return the name for known values", () => {
			assert.equal(Enum.getName(SampleEnum, false), "zero");
			assert.equal(Enum.getName(SampleEnum, 1), "one");
			assert.equal(Enum.getName(SampleEnum, "TWO"), "two");
			assert.equal(Enum.getName(SampleEnum, 3.0), "three");
		});
	});

	describe("getNames()", () => {
		it("should return the names of the enumerable properties", () => {
			assert.deepEqual(Enum.getNames(SampleEnum), ["zero", "one", "two", "three"]);
		});
	});

	describe("getValues()", () => {
		it("should return the values of the enumerable properties", () => {
			assert.deepEqual(Enum.getValues(SampleEnum), [false, 1, "TWO", 3.0]);
		});
	});

	describe("isDefined()", () => {
		it("should return `false` for unknown values", () => {
			assert.ok(!Enum.isDefined(SampleEnum, 0));
			assert.ok(!Enum.isDefined(SampleEnum, "two"));
			assert.ok(!Enum.isDefined(SampleEnum, 3.1));
		});

		it("should return `true` for known values", () => {
			assert.ok(Enum.isDefined(SampleEnum, false));
			assert.ok(Enum.isDefined(SampleEnum, 1));
			assert.ok(Enum.isDefined(SampleEnum, "TWO"));
			assert.ok(Enum.isDefined(SampleEnum, 3.0));
		});
	});
});
