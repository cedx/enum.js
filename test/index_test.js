import {Enum} from "@cedx/enum";
import {ok} from "node:assert/strict";
import {describe, it} from "node:test";

/**
 * Tests the features of the {@link Enum} function.
 */
describe("Enum()", () => {
	const SampleEnum = Enum({ // eslint-disable-line new-cap
		zero: false,
		one: 1,
		two: "TWO",
		three: 3.0
	});

	it("should create types that are immutable", () =>
		ok(Object.isFrozen(SampleEnum)));

	it("should create types having the `Enum` interface", () => {
		const methods = ["assert", "coerce", "entries", "getName", "has", "hasValue", "keys", "values"];
		ok(methods.every(method => typeof Reflect.get(SampleEnum, method) == "function"));
	});
});
