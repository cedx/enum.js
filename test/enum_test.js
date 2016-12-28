'use strict';

import assert from 'assert';
import {Enum} from '../src/index';

/**
 * A sample enumeration.
 * @type {object}
 *
 * @property {boolean} ZERO The first enumerated value.
 * @property {number} ONE The second enumerated value.
 * @property {string} TWO The third enumerated value.
 * @property {number} THREE The fourth enumerated value.
 */
const SampleEnum = Enum.create({
  /* eslint-disable sort-keys */
  ZERO: false,
  ONE: 1,
  TWO: 'two',
  THREE: 3.0
  /* eslint-enable sort-keys */
});

/**
 * @test {Enum}
 */
describe('Enum', () => {

  /**
   * @test {Enum.create}
   */
  describe('.create()', () => {
    it('should create types that are not instantiable', () => {
      assert.throws(() => new SampleEnum(), TypeError);
    });

    it('should create types that are immutable', () => {
      assert.ok(Object.isFrozen(SampleEnum));
    });

    it('should create types having the `Enum` mixins', () => {
      assert.equal(typeof SampleEnum.isDefined, 'function');
      assert.equal(typeof SampleEnum.getName, 'function');
      assert.equal(typeof SampleEnum.getNames, 'function');
      assert.equal(typeof SampleEnum.getValues, 'function');
    });
  });

  /**
   * @test {Enum.isDefined}
   */
  describe('.isDefined()', () => {
    it('should return `false` for unknown values', () => {
      assert.ok(!SampleEnum.isDefined('TWO'));
      assert.ok(!SampleEnum.isDefined(3.1));
    });

    it('should return `true` for known values', () => {
      assert.ok(SampleEnum.isDefined(false));
      assert.ok(SampleEnum.isDefined(1));
      assert.ok(SampleEnum.isDefined('two'));
      assert.ok(SampleEnum.isDefined(3.0));
    });
  });

  /**
   * @test {Enum.getName}
   */
  describe('.getName()', () => {
    it('should return an empty string for unknown values', () => {
      assert.equal(SampleEnum.getName('TWO'), '');
      assert.equal(SampleEnum.getName(3.1), '');
    });

    it('should return the name for known values', () => {
      assert.equal(SampleEnum.getName(false), 'ZERO');
      assert.equal(SampleEnum.getName(1), 'ONE');
      assert.equal(SampleEnum.getName('two'), 'TWO');
      assert.equal(SampleEnum.getName(3.0), 'THREE');
    });
  });

  /**
   * @test {Enum.getNames}
   */
  describe('.getNames()', () => {
    it('should return the names of the enumerable properties', () => {
      let names = SampleEnum.getNames();
      assert.equal(names.length, 4);
      assert.equal(names[0], 'ZERO');
      assert.equal(names[1], 'ONE');
      assert.equal(names[2], 'TWO');
      assert.equal(names[3], 'THREE');
    });
  });

  /**
   * @test {Enum.getValues}
   */
  describe('.getValues()', () => {
    it('should return the values of the enumerable properties', () => {
      let values = SampleEnum.getValues();
      assert.equal(values.length, 4);
      assert.strictEqual(values[0], false);
      assert.strictEqual(values[1], 1);
      assert.strictEqual(values[2], 'two');
      assert.strictEqual(values[3], 3.0);
    });
  });
});
