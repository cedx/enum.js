import * as chai from 'chai';
import {Enum} from '../src/index';

/** A sample enumeration. */
const SampleEnum = Enum.create<any>({
  zero: false,
  one: 1,
  two: 'TWO',
  three: 3.0
});

/** Tests the features of the [[Enum]] class. */
describe('EnumTest', () => {
  const {expect} = chai;

  describe('#assert()', () => {
    it('should return the specified value if it is a known one', () => {
      expect(SampleEnum.assert(false)).to.equal(SampleEnum.zero);
      expect(SampleEnum.assert(1)).to.equal(SampleEnum.one);
      expect(SampleEnum.assert('TWO')).to.equal(SampleEnum.two);
      expect(SampleEnum.assert(3.0)).to.equal(SampleEnum.three);
    });

    it('should throw an exception if it is an unknown value', () => {
      expect(() => SampleEnum.assert('')).to.throw(TypeError);
      expect(() => SampleEnum.assert('two')).to.throw(TypeError);
      expect(() => SampleEnum.assert(3.1)).to.throw(TypeError);
    });
  });

  describe('.create()', () => {
    it('should create types that are not instantiable', () => {
      // @ts-ignore
      expect(() => new SampleEnum).to.throw(TypeError);
    });

    it('should create types that are immutable', () => {
      expect(SampleEnum).to.be.frozen;
    });

    it('should create types having the `Enum` mixins', () => {
      expect(SampleEnum.assert).to.be.a('function');
      expect(SampleEnum.coerce).to.be.a('function');
      expect(SampleEnum.entries).to.be.a('function');
      expect(SampleEnum.isDefined).to.be.a('function');
      expect(SampleEnum.getIndex).to.be.a('function');
      expect(SampleEnum.getName).to.be.a('function');
      expect(SampleEnum.names).to.be.a('function');
      expect(SampleEnum.values).to.be.a('function');
    });
  });

  describe('#coerce()', () => {
    it('should return the specified value if it is a known one', () => {
      expect(SampleEnum.coerce(false)).to.equal(SampleEnum.zero);
      expect(SampleEnum.coerce(1)).to.equal(SampleEnum.one);
      expect(SampleEnum.coerce('TWO')).to.equal(SampleEnum.two);
      expect(SampleEnum.coerce(3.0)).to.equal(SampleEnum.three);
    });

    it('should return the default value if it is an unknown one', () => {
      expect(SampleEnum.coerce('')).to.be.undefined;
      expect(SampleEnum.coerce('two', false)).to.be.false;
      expect(SampleEnum.coerce(3.1, SampleEnum.zero)).to.equal(SampleEnum.zero);
    });
  });

  describe('#entries()', () => {
    it('should return the pairs of names and values of the enumerated constants', () => {
      const entries = SampleEnum.entries();
      expect(entries).to.have.lengthOf(4);
      for (const entry of entries) expect(entry).to.be.an('array').and.have.lengthOf(2);

      let [name, value] = entries[0]; // eslint-disable-line prefer-destructuring
      expect(name).to.equal('zero');
      expect(value).to.be.false;

      [name, value] = entries[1]; // eslint-disable-line prefer-destructuring
      expect(name).to.equal('one');
      expect(value).to.equal(1);

      [name, value] = entries[2]; // eslint-disable-line prefer-destructuring
      expect(name).to.equal('two');
      expect(value).to.equal('TWO');

      [name, value] = entries[3]; // eslint-disable-line prefer-destructuring
      expect(name).to.equal('three');
      expect(value).to.equal(3.0);
    });
  });

  describe('#getIndex()', () => {
    it('should return `-1` for unknown values', () => {
      expect(SampleEnum.getIndex(0)).to.equal(-1);
      expect(SampleEnum.getIndex('two')).to.equal(-1);
      expect(SampleEnum.getIndex(3.1)).to.equal(-1);
    });

    it('should return the index of the enumerated constant for known values', () => {
      expect(SampleEnum.getIndex(false)).to.equal(0);
      expect(SampleEnum.getIndex(1)).to.equal(1);
      expect(SampleEnum.getIndex('TWO')).to.equal(2);
      expect(SampleEnum.getIndex(3.0)).to.equal(3);
    });
  });

  describe('#getName()', () => {
    it('should return an empty string for unknown values', () => {
      expect(SampleEnum.getName(0)).to.be.empty;
      expect(SampleEnum.getName('two')).to.be.empty;
      expect(SampleEnum.getName(3.1)).to.be.empty;
    });

    it('should return the name for known values', () => {
      expect(SampleEnum.getName(false)).to.equal('zero');
      expect(SampleEnum.getName(1)).to.equal('one');
      expect(SampleEnum.getName('TWO')).to.equal('two');
      expect(SampleEnum.getName(3.0)).to.equal('three');
    });
  });

  describe('#isDefined()', () => {
    it('should return `false` for unknown values', () => {
      expect(SampleEnum.isDefined(0)).to.be.false;
      expect(SampleEnum.isDefined('two')).to.be.false;
      expect(SampleEnum.isDefined(3.1)).to.be.false;
    });

    it('should return `true` for known values', () => {
      expect(SampleEnum.isDefined(false)).to.be.true;
      expect(SampleEnum.isDefined(1)).to.be.true;
      expect(SampleEnum.isDefined('TWO')).to.be.true;
      expect(SampleEnum.isDefined(3.0)).to.be.true;
    });
  });

  describe('#names()', () => {
    it('should return the names of the enumerable properties', () => {
      const names = SampleEnum.names();
      expect(names).to.have.lengthOf(4);
      expect(names[0]).to.equal('zero');
      expect(names[1]).to.equal('one');
      expect(names[2]).to.equal('two');
      expect(names[3]).to.equal('three');
    });
  });

  describe('#values()', () => {
    it('should return the values of the enumerable properties', () => {
      const values = SampleEnum.values();
      expect(values).to.have.lengthOf(4);
      expect(values[0]).to.be.false;
      expect(values[1]).to.equal(1);
      expect(values[2]).to.equal('TWO');
      expect(values[3]).to.equal(3.0);
    });
  });
});
