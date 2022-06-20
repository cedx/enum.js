import assert from "node:assert/strict";
import test from "node:test";
import {Enum} from "../lib/enum.js";
import createEnum from "../lib/index.js";

/**
 * A sample enumeration.
 * @enum {boolean|number|string}
 */
const SampleEnum = createEnum({
	zero: false,
	one: 1,
	two: "TWO",
	three: 3.0
});

test("createEnum()", async ctx => {
	await ctx.test("should create types that are immutable", () => {
		assert.ok(Object.isFrozen(SampleEnum));
	});

	await ctx.test("should create types having the `EnumMixin` mixin", () => {
		const methods = Reflect.ownKeys(Enum).filter(key => typeof Reflect.get(Enum, key) == "function");
		assert.ok(methods.every(method => typeof Reflect.get(SampleEnum, method) == "function"));
	});
});

test("createEnum().assert()", async ctx => {
	await ctx.test("should return the specified value if it is a known one", () => {
		assert.equal(SampleEnum.assert(false), SampleEnum.zero);
		assert.equal(SampleEnum.assert(1), SampleEnum.one);
		assert.equal(SampleEnum.assert("TWO"), SampleEnum.two);
		assert.equal(SampleEnum.assert(3.0), SampleEnum.three);
	});

	await ctx.test("should throw an exception if it is an unknown value", () => {
		assert.throws(() => SampleEnum.assert(""), TypeError);
		assert.throws(() => SampleEnum.assert("two"), TypeError);
		assert.throws(() => SampleEnum.assert(3.1), TypeError);
	});
});

test("createEnum().coerce()", async ctx => {
	await ctx.test("should return the specified value if it is a known one", () => {
		assert.equal(SampleEnum.coerce(false, SampleEnum.zero), SampleEnum.zero);
		assert.equal(SampleEnum.coerce(1, SampleEnum.zero), SampleEnum.one);
		assert.equal(SampleEnum.coerce("TWO", SampleEnum.zero), SampleEnum.two);
		assert.equal(SampleEnum.coerce(3.0, SampleEnum.zero), SampleEnum.three);
	});

	await ctx.test("should return the default value if it is an unknown one", () => {
		assert.equal(SampleEnum.coerce("", SampleEnum.zero), SampleEnum.zero);
		assert.equal(SampleEnum.coerce("two", SampleEnum.two), SampleEnum.two);
		assert.equal(SampleEnum.coerce(3.1, SampleEnum.two), SampleEnum.two);
	});
});

test("createEnum().getEntries()", async ctx => {
	await ctx.test("should return the pairs of names and values", () => {
		const entries = SampleEnum.getEntries();
		assert.equal(entries.size, 4);

		const [tuple1, tuple2, tuple3, tuple4] = entries;
		assert.deepEqual(tuple1, ["zero", false]);
		assert.deepEqual(tuple2, ["one", 1]);
		assert.deepEqual(tuple3, ["two", "TWO"]);
		assert.deepEqual(tuple4, ["three", 3.0]);
	});
});

test("createEnum().getIndex()", async ctx => {
	await ctx.test("should return `-1` for unknown values", () => {
		assert.equal(SampleEnum.getIndex(0), -1);
		assert.equal(SampleEnum.getIndex("two"), -1);
		assert.equal(SampleEnum.getIndex(3.1), -1);
	});

	await ctx.test("should return the index for known values", () => {
		assert.equal(SampleEnum.getIndex(false), 0);
		assert.equal(SampleEnum.getIndex(1), 1);
		assert.equal(SampleEnum.getIndex("TWO"), 2);
		assert.equal(SampleEnum.getIndex(3.0), 3);
	});
});

test("createEnum().getName()", async ctx => {
	await ctx.test("should return an empty string for unknown values", () => {
		assert.equal(SampleEnum.getName(0).length, 0);
		assert.equal(SampleEnum.getName("two").length, 0);
		assert.equal(SampleEnum.getName(3.1).length, 0);
	});

	await ctx.test("should return the name for known values", () => {
		assert.equal(SampleEnum.getName(false), "zero");
		assert.equal(SampleEnum.getName(1), "one");
		assert.equal(SampleEnum.getName("TWO"), "two");
		assert.equal(SampleEnum.getName(3.0), "three");
	});
});

test("createEnum().getNames()", async ctx => {
	await ctx.test("should return the names of the enumerable properties", () => {
		assert.deepEqual(SampleEnum.getNames(), ["zero", "one", "two", "three"]);
	});
});

test("createEnum().getValues()", async ctx => {
	await ctx.test("should return the values of the enumerable properties", () => {
		assert.deepEqual(SampleEnum.getValues(), [false, 1, "TWO", 3.0]);
	});
});

test("createEnum().isDefined()", async ctx => {
	await ctx.test("should return `false` for unknown values", () => {
		assert.ok(!SampleEnum.isDefined(0));
		assert.ok(!SampleEnum.isDefined("two"));
		assert.ok(!SampleEnum.isDefined(3.1));
	});

	await ctx.test("should return `true` for known values", () => {
		assert.ok(SampleEnum.isDefined(false));
		assert.ok(SampleEnum.isDefined(1));
		assert.ok(SampleEnum.isDefined("TWO"));
		assert.ok(SampleEnum.isDefined(3.0));
	});
});
