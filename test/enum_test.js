/* eslint-disable max-lines-per-function */
import {deepEqual, equal, ok, throws} from "node:assert/strict";
import {describe, it} from "node:test";
import createEnum from "@cedx/enum";

/**
 * Tests the features of the {@link Enum} interface.
 */
describe("Enum", () => {
	const SampleEnum = createEnum({
		zero: false,
		one: 1,
		two: "TWO",
		three: 3.0
	});

	describe("assert()", () => {
		it("should return the specified value if it is a known one", () => {
			equal(SampleEnum.assert(false), SampleEnum.zero);
			equal(SampleEnum.assert(1), SampleEnum.one);
			equal(SampleEnum.assert("TWO"), SampleEnum.two);
			equal(SampleEnum.assert(3.0), SampleEnum.three);
		});

		it("should throw an exception if it is an unknown value", () => {
			throws(() => SampleEnum.assert(""), TypeError);
			throws(() => SampleEnum.assert("two"), TypeError);
			throws(() => SampleEnum.assert(3.5), TypeError);
		});
	});

	describe("coerce()", () => {
		it("should return the specified value if it is a known one", () => {
			equal(SampleEnum.coerce(false, SampleEnum.zero), SampleEnum.zero);
			equal(SampleEnum.coerce(1, SampleEnum.zero), SampleEnum.one);
			equal(SampleEnum.coerce("TWO", SampleEnum.zero), SampleEnum.two);
			equal(SampleEnum.coerce(3.0, SampleEnum.zero), SampleEnum.three);
		});

		it("should return the default value if it is an unknown one", () => {
			equal(SampleEnum.coerce("", SampleEnum.zero), SampleEnum.zero);
			equal(SampleEnum.coerce("two", SampleEnum.two), SampleEnum.two);
			equal(SampleEnum.coerce(3.5, SampleEnum.three), SampleEnum.three);
		});
	});

	describe("getEntries()", () => {
		it("should return the pairs of names and values", () => {
			const entries = SampleEnum.getEntries();
			equal(entries.size, 4);

			const [zero, one, two, three] = entries;
			deepEqual(zero, ["zero", false]);
			deepEqual(one, ["one", 1]);
			deepEqual(two, ["two", "TWO"]);
			deepEqual(three, ["three", 3.0]);
		});
	});

	describe("getName()", () => {
		it("should return an empty string for unknown values", () => {
			equal(SampleEnum.getName(0).length, 0);
			equal(SampleEnum.getName("two").length, 0);
			equal(SampleEnum.getName(3.5).length, 0);
		});

		it("should return the name for known values", () => {
			equal(SampleEnum.getName(false), "zero");
			equal(SampleEnum.getName(1), "one");
			equal(SampleEnum.getName("TWO"), "two");
			equal(SampleEnum.getName(3.0), "three");
		});
	});

	describe("hasValue()", () => {
		it("should return `false` for unknown values", () => {
			ok(!SampleEnum.hasValue(0));
			ok(!SampleEnum.hasValue("two"));
			ok(!SampleEnum.hasValue(3.5));
		});

		it("should return `true` for known values", () => {
			ok(SampleEnum.hasValue(false));
			ok(SampleEnum.hasValue(1));
			ok(SampleEnum.hasValue("TWO"));
			ok(SampleEnum.hasValue(3.0));
		});
	});

	describe("keys()", () => {
		it("should return the names of the enumerable properties", () =>
			deepEqual(SampleEnum.keys(), ["zero", "one", "two", "three"]));
	});

	describe("values()", () => {
		it("should return the values of the enumerable properties", () =>
			deepEqual(SampleEnum.values(), [false, 1, "TWO", 3.0]));
	});
});
