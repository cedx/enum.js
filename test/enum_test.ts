import * as chai from 'chai';
import {Enum} from '../src/index';

/** An enumeration providing a mixed set of scalar values. */
const MixedEnum = Enum.create<any>({
  zero: false,
  one: 1,
  two: 'TWO',
  three: 3.0
});

/** An enumeration providing numeric values. */
enum NumericEnum {
  one = 1 << 0,
  two = 1 << 1,
  four = 1 << 2,
  eight = 1 << 3
}

/** An enumeration providing string values. */
enum StringEnum {
  zero = 'ZERO',
  one = 'ONE',
  two = 'TWO',
  three = 'THREE'
}

/** Tests the features of the [[Enum]] class. */
describe('Enum', () => {
  const {expect} = chai;

  describe('.assert()', () => {
    it('should return the specified value if it is a known one', () => {
      expect(MixedEnum.assert(false)).to.equal(MixedEnum.zero);
      expect(MixedEnum.assert(1)).to.equal(MixedEnum.one);
      expect(MixedEnum.assert('TWO')).to.equal(MixedEnum.two);
      expect(MixedEnum.assert(3.0)).to.equal(MixedEnum.three);

      expect(Enum.assert(NumericEnum, 1)).to.equal(NumericEnum.one);
      expect(Enum.assert(StringEnum, 'ONE')).to.equal(StringEnum.one);
    });

    it('should throw an exception if it is an unknown value', () => {
      expect(() => MixedEnum.assert('')).to.throw(TypeError);
      expect(() => MixedEnum.assert('two')).to.throw(TypeError);
      expect(() => MixedEnum.assert(3.1)).to.throw(TypeError);

      expect(() => Enum.assert(NumericEnum, 0)).to.throw(TypeError);
      expect(() => Enum.assert(StringEnum, 'zero')).to.throw(TypeError);

      // Edge case: reverse mapping of numeric enums.
      expect(() => Enum.assert(NumericEnum, 'one')).to.throw(TypeError);
    });
  });

  describe('.coerce()', () => {
    it('should return the specified value if it is a known one', () => {
      expect(MixedEnum.coerce(false)).to.equal(MixedEnum.zero);
      expect(MixedEnum.coerce(1)).to.equal(MixedEnum.one);
      expect(MixedEnum.coerce('TWO')).to.equal(MixedEnum.two);
      expect(MixedEnum.coerce(3.0)).to.equal(MixedEnum.three);

      expect(Enum.coerce(NumericEnum, 1)).to.equal(NumericEnum.one);
      expect(Enum.coerce(StringEnum, 'ONE')).to.equal(StringEnum.one);
    });

    it('should return the default value if it is an unknown one', () => {
      expect(MixedEnum.coerce('')).to.be.undefined;
      expect(MixedEnum.coerce('two', false)).to.be.false;
      expect(MixedEnum.coerce(3.1, MixedEnum.zero)).to.equal(MixedEnum.zero);

      expect(Enum.coerce(NumericEnum, 0)).to.be.undefined;
      expect(Enum.coerce(NumericEnum, 0, 123)).to.equal(123);
      expect(Enum.coerce(StringEnum, 'zero')).to.be.undefined;
      expect(Enum.coerce(StringEnum, 'zero', 'foo')).to.equal('foo');

      // Edge case: reverse mapping of numeric enums.
      expect(Enum.coerce(NumericEnum, 'one')).to.be.undefined;
    });
  });

  describe('.create()', () => {
    it('should create types that are immutable', () => {
      expect(MixedEnum).to.be.frozen;
    });

    it('should create types having the `Enum` mixin', () => {
      const methods = ['assert', 'coerce', 'entries', 'getIndex', 'getName', 'isDefined', 'names', 'values'];
      for (const method of methods) expect(MixedEnum[method]).to.be.a('function');
    });
  });

  describe('.entries()', () => {
    it('should return the pairs of names and values of the enumerated constants', () => {
      let entries = MixedEnum.entries();
      expect(entries).to.have.lengthOf(4);

      let [tuple1, tuple2, tuple3, tuple4] = entries;
      expect(tuple1).to.have.ordered.members(['zero', false]);
      expect(tuple2).to.have.ordered.members(['one', 1]);
      expect(tuple3).to.have.ordered.members(['two', 'TWO']);
      expect(tuple4).to.have.ordered.members(['three', 3.0]);

      entries = Enum.entries(NumericEnum);
      expect(entries).to.have.lengthOf(4);

      [tuple1, tuple2, tuple3, tuple4] = entries;
      expect(tuple1).to.have.ordered.members(['one', 1]);
      expect(tuple2).to.have.ordered.members(['two', 2]);
      expect(tuple3).to.have.ordered.members(['four', 4]);
      expect(tuple4).to.have.ordered.members(['eight', 8]);

      entries = Enum.entries(StringEnum);
      expect(entries).to.have.lengthOf(4);

      [tuple1, tuple2, tuple3, tuple4] = entries;
      expect(tuple1).to.have.ordered.members(['zero', 'ZERO']);
      expect(tuple2).to.have.ordered.members(['one', 'ONE']);
      expect(tuple3).to.have.ordered.members(['two', 'TWO']);
      expect(tuple4).to.have.ordered.members(['three', 'THREE']);
    });
  });

  describe('.getIndex()', () => {
    it('should return `-1` for unknown values', () => {
      expect(MixedEnum.getIndex(0)).to.equal(-1);
      expect(MixedEnum.getIndex('two')).to.equal(-1);
      expect(MixedEnum.getIndex(3.1)).to.equal(-1);

      expect(Enum.getIndex(NumericEnum, 0)).to.equal(-1);
      expect(Enum.getIndex(StringEnum, 'zero')).to.equal(-1);

      // Edge case: reverse mapping of numeric enums.
      expect(Enum.getIndex(NumericEnum, 'one')).to.equal(-1);
    });

    it('should return the index of the enumerated constant for known values', () => {
      expect(MixedEnum.getIndex(false)).to.equal(0);
      expect(MixedEnum.getIndex(1)).to.equal(1);
      expect(MixedEnum.getIndex('TWO')).to.equal(2);
      expect(MixedEnum.getIndex(3.0)).to.equal(3);

      expect(Enum.getIndex(NumericEnum, 1)).to.equal(0);
      expect(Enum.getIndex(StringEnum, 'ONE')).to.equal(1);
    });
  });

  describe('.getName()', () => {
    it('should return an empty string for unknown values', () => {
      expect(MixedEnum.getName(0)).to.be.empty;
      expect(MixedEnum.getName('two')).to.be.empty;
      expect(MixedEnum.getName(3.1)).to.be.empty;

      expect(Enum.getName(NumericEnum, 0)).to.be.empty;
      expect(Enum.getName(StringEnum, 'zero')).to.be.empty;

      // Edge case: reverse mapping of numeric enums.
      expect(Enum.getName(NumericEnum, 'one')).to.be.empty;
    });

    it('should return the name for known values', () => {
      expect(MixedEnum.getName(false)).to.equal('zero');
      expect(MixedEnum.getName(1)).to.equal('one');
      expect(MixedEnum.getName('TWO')).to.equal('two');
      expect(MixedEnum.getName(3.0)).to.equal('three');

      expect(Enum.getName(NumericEnum, 1)).to.equal('one');
      expect(Enum.getName(StringEnum, 'ONE')).to.equal('one');
    });
  });

  describe('.isDefined()', () => {
    it('should return `false` for unknown values', () => {
      expect(MixedEnum.isDefined(0)).to.be.false;
      expect(MixedEnum.isDefined('two')).to.be.false;
      expect(MixedEnum.isDefined(3.1)).to.be.false;

      expect(Enum.isDefined(NumericEnum, 0)).to.be.false;
      expect(Enum.isDefined(StringEnum, 'zero')).to.be.false;

      // Edge case: reverse mapping of numeric enums.
      expect(Enum.isDefined(NumericEnum, 'one')).to.be.false;
    });

    it('should return `true` for known values', () => {
      expect(MixedEnum.isDefined(false)).to.be.true;
      expect(MixedEnum.isDefined(1)).to.be.true;
      expect(MixedEnum.isDefined('TWO')).to.be.true;
      expect(MixedEnum.isDefined(3.0)).to.be.true;

      expect(Enum.isDefined(NumericEnum, 1)).to.be.true;
      expect(Enum.isDefined(StringEnum, 'ONE')).to.be.true;
    });
  });

  describe('.names()', () => {
    it('should return the names of the enumerable properties', () => {
      expect(MixedEnum.names()).to.have.ordered.members(['zero', 'one', 'two', 'three']);
      expect(Enum.names(NumericEnum)).to.have.ordered.members(['one', 'two', 'four', 'eight']);
      expect(Enum.names(StringEnum)).to.have.ordered.members(['zero', 'one', 'two', 'three']);
    });
  });

  describe('.values()', () => {
    it('should return the values of the enumerable properties', () => {
      expect(MixedEnum.values()).to.have.ordered.members([false, 1, 'TWO', 3.0]);
      expect(Enum.values(NumericEnum)).to.have.ordered.members([1, 2, 4, 8]);
      expect(Enum.values(StringEnum)).to.have.ordered.members(['ZERO', 'ONE', 'TWO', 'THREE']);
    });
  });
});
