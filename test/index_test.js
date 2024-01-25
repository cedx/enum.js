import {ok} from "node:assert/strict";
import {describe, it} from "node:test";
import createEnum from "#enum";

/**
 * Tests the features of the {@link createEnum} function.
 */
describe("createEnum()", () => {
	const SampleEnum = createEnum({
		zero: false,
		one: 1,
		two: "TWO",
		three: 3.0
	});

	it("should create types that are immutable", () =>
		ok(Object.isFrozen(SampleEnum)));

	it("should create types having the `EnumMixin` mixin", () => {
		const methods = ["assert", "coerce", "getEntries", "getIndex", "getName", "getNames", "getValues", "isDefined"];
		ok(methods.every(method => typeof Reflect.get(SampleEnum, method) == "function"));
	});
});
