import assert from "node:assert/strict";
import test from "node:test";
import {Enum} from "../src/enum.js";

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

test("Enum.assert()", async ctx => {
	await ctx.test("should return the specified value if it is a known one", () => {
		assert.equal(Enum.assert(SampleEnum, false), SampleEnum.zero);
		assert.equal(Enum.assert(SampleEnum, 1), SampleEnum.one);
		assert.equal(Enum.assert(SampleEnum, "TWO"), SampleEnum.two);
		assert.equal(Enum.assert(SampleEnum, 3.0), SampleEnum.three);
	});

	await ctx.test("should throw an exception if it is an unknown value", () => {
		assert.throws(() => Enum.assert(SampleEnum, ""), TypeError);
		assert.throws(() => Enum.assert(SampleEnum, "two"), TypeError);
		assert.throws(() => Enum.assert(SampleEnum, 3.1), TypeError);
	});
});

test("Enum.coerce()", async ctx => {
	await ctx.test("should return the specified value if it is a known one", () => {
		assert.equal(Enum.coerce(SampleEnum, false, SampleEnum.zero), SampleEnum.zero);
		assert.equal(Enum.coerce(SampleEnum, 1, SampleEnum.zero), SampleEnum.one);
		assert.equal(Enum.coerce(SampleEnum, "TWO", SampleEnum.zero), SampleEnum.two);
		assert.equal(Enum.coerce(SampleEnum, 3.0, SampleEnum.zero), SampleEnum.three);
	});

	await ctx.test("should return the default value if it is an unknown one", () => {
		assert.equal(Enum.coerce(SampleEnum, "", SampleEnum.zero), SampleEnum.zero);
		assert.equal(Enum.coerce(SampleEnum, "two", SampleEnum.two), SampleEnum.two);
		assert.equal(Enum.coerce(SampleEnum, 3.1, SampleEnum.two), SampleEnum.two);
	});
});

test("Enum.getEntries()", async ctx => {
	await ctx.test("should return the pairs of names and values", () => {
		const entries = Enum.getEntries(SampleEnum);
		assert.equal(entries.size, 4);

		const [tuple1, tuple2, tuple3, tuple4] = entries;
		assert.deepEqual(tuple1, ["zero", false]);
		assert.deepEqual(tuple2, ["one", 1]);
		assert.deepEqual(tuple3, ["two", "TWO"]);
		assert.deepEqual(tuple4, ["three", 3.0]);
	});
});

test("Enum.getIndex()", async ctx => {
	await ctx.test("should return `-1` for unknown values", () => {
		assert.equal(Enum.getIndex(SampleEnum, 0), -1);
		assert.equal(Enum.getIndex(SampleEnum, "two"), -1);
		assert.equal(Enum.getIndex(SampleEnum, 3.1), -1);
	});

	await ctx.test("should return the index for known values", () => {
		assert.equal(Enum.getIndex(SampleEnum, false), 0);
		assert.equal(Enum.getIndex(SampleEnum, 1), 1);
		assert.equal(Enum.getIndex(SampleEnum, "TWO"), 2);
		assert.equal(Enum.getIndex(SampleEnum, 3.0), 3);
	});
});

test("Enum.getName()", async ctx => {
	await ctx.test("should return an empty string for unknown values", () => {
		assert.equal(Enum.getName(SampleEnum, 0).length, 0);
		assert.equal(Enum.getName(SampleEnum, "two").length, 0);
		assert.equal(Enum.getName(SampleEnum, 3.1).length, 0);
	});

	await ctx.test("should return the name for known values", () => {
		assert.equal(Enum.getName(SampleEnum, false), "zero");
		assert.equal(Enum.getName(SampleEnum, 1), "one");
		assert.equal(Enum.getName(SampleEnum, "TWO"), "two");
		assert.equal(Enum.getName(SampleEnum, 3.0), "three");
	});
});

test("Enum.getNames()", async ctx => {
	await ctx.test("should return the names of the enumerable properties", () => {
		assert.deepEqual(Enum.getNames(SampleEnum), ["zero", "one", "two", "three"]);
	});
});

test("Enum.getValues()", async ctx => {
	await ctx.test("should return the values of the enumerable properties", () => {
		assert.deepEqual(Enum.getValues(SampleEnum), [false, 1, "TWO", 3.0]);
	});
});

test("Enum.isDefined()", async ctx => {
	await ctx.test("should return `false` for unknown values", () => {
		assert.ok(!Enum.isDefined(SampleEnum, 0));
		assert.ok(!Enum.isDefined(SampleEnum, "two"));
		assert.ok(!Enum.isDefined(SampleEnum, 3.1));
	});

	await ctx.test("should return `true` for known values", () => {
		assert.ok(Enum.isDefined(SampleEnum, false));
		assert.ok(Enum.isDefined(SampleEnum, 1));
		assert.ok(Enum.isDefined(SampleEnum, "TWO"));
		assert.ok(Enum.isDefined(SampleEnum, 3.0));
	});
});
