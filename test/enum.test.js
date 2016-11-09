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
  /* eslint sort-keys: "off" */
  ZERO: false,
  ONE: 1,
  TWO: 'two',
  THREE: 3.0
});

/**
 * @test {Enum}
 */
describe('Enum', () => {

  /**
   * @test {Enum.create}
   */
  /*
  describe('.create()', () => {
    it('should create types that are not instantiable', () => {
      assert.throws(() => new SampleEnum(), TypeError);
    });

    it('should return an empty instance with an empty JSON object', () => {
    });

    it('should return an initialized instance with a non-empty JSON object', () => {
    });
  });*/

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
    it('should return a null reference with a non-object JSON string', () => {
      assert.equal(SampleEnum.getName('TWO'), '');
      assert.equal(SampleEnum.getName(3.1), '');
    });

    it('should return an empty instance with an empty JSON object', () => {
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
    it('should return a null reference with a non-object JSON string', () => {
      assert.equal(SampleEnum.getNames(), ['ZERO', 'ONE', 'TWO', 'THREE']);
    });
  });

  /**
   * @test {Enum.getValues}
   */
  describe('.getValues()', () => {
    it('should return a null reference with a non-object JSON string', () => {
      assert.equal(SampleEnum.getValues(), [false, 1, 'two', 3.0]);
    });
  });
});
