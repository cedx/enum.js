'use strict';

const {expect} = require('chai');
const {Enum} = require('../lib');

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
  describe('.create()', () => {
    it('should create types that are not instantiable', () => {
      expect(() => new SampleEnum).to.throw(TypeError);
    });

    it('should create types that are immutable', () => {
      expect(SampleEnum).to.be.frozen;
    });

    it('should create types having the `Enum` mixins', () => {
      expect(SampleEnum.isDefined).to.be.a('function');
      expect(SampleEnum.getEntries).to.be.a('function');
      expect(SampleEnum.getIndex).to.be.a('function');
      expect(SampleEnum.getName).to.be.a('function');
      expect(SampleEnum.getNames).to.be.a('function');
      expect(SampleEnum.getValues).to.be.a('function');
    });
  });

  /**
   * @test {Enum.isDefined}
   */
  describe('.isDefined()', () => {
    it('should return `false` for unknown values', () => {
      expect(SampleEnum.isDefined(0)).to.be.false;
      expect(SampleEnum.isDefined('TWO')).to.be.false;
      expect(SampleEnum.isDefined(3.1)).to.be.false;
    });

    it('should return `true` for known values', () => {
      expect(SampleEnum.isDefined(false)).to.be.true;
      expect(SampleEnum.isDefined(1)).to.be.true;
      expect(SampleEnum.isDefined('two')).to.be.true;
      expect(SampleEnum.isDefined(3.0)).to.be.true;
    });
  });

  /**
   * @test {Enum.getEntries}
   */
  describe('.getEntries()', () => {
    it('should return the pairs of names and values of the enumerated constants', () => {
      let entries = SampleEnum.getEntries();
      expect(entries).to.have.lengthOf(4);
      for (let entry of entries) expect(entry).to.be.an('array').and.have.lengthOf(2);

      let [name, value] = entries[0];
      expect(name).to.equal('ZERO');
      expect(value).to.be.false;

      [name, value] = entries[1];
      expect(name).to.equal('ONE');
      expect(value).to.equal(1);

      [name, value] = entries[2];
      expect(name).to.equal('TWO');
      expect(value).to.equal('two');

      [name, value] = entries[3];
      expect(name).to.equal('THREE');
      expect(value).to.equal(3.0);
    });
  });

  /**
   * @test {Enum.getIndex}
   */
  describe('.getIndex()', () => {
    it('should return `-1` for unknown values', () => {
      expect(SampleEnum.getIndex(0)).to.equal(-1);
      expect(SampleEnum.getIndex('TWO')).to.equal(-1);
      expect(SampleEnum.getIndex(3.1)).to.equal(-1);
    });

    it('should return the index of the enumerated constant for known values', () => {
      expect(SampleEnum.getIndex(false)).to.equal(0);
      expect(SampleEnum.getIndex(1)).to.equal(1);
      expect(SampleEnum.getIndex('two')).to.equal(2);
      expect(SampleEnum.getIndex(3.0)).to.equal(3);
    });
  });

  /**
   * @test {Enum.getName}
   */
  describe('.getName()', () => {
    it('should return an empty string for unknown values', () => {
      expect(SampleEnum.getName(0)).to.be.empty;
      expect(SampleEnum.getName('TWO')).to.be.empty;
      expect(SampleEnum.getName(3.1)).to.be.empty;
    });

    it('should return the name for known values', () => {
      expect(SampleEnum.getName(false)).to.equal('ZERO');
      expect(SampleEnum.getName(1)).to.equal('ONE');
      expect(SampleEnum.getName('two')).to.equal('TWO');
      expect(SampleEnum.getName(3.0)).to.equal('THREE');
    });
  });

  /**
   * @test {Enum.getNames}
   */
  describe('.getNames()', () => {
    it('should return the names of the enumerable properties', () => {
      let names = SampleEnum.getNames();
      expect(names).to.have.lengthOf(4);
      expect(names[0]).to.equal('ZERO');
      expect(names[1]).to.equal('ONE');
      expect(names[2]).to.equal('TWO');
      expect(names[3]).to.equal('THREE');
    });
  });

  /**
   * @test {Enum.getValues}
   */
  describe('.getValues()', () => {
    it('should return the values of the enumerable properties', () => {
      let values = SampleEnum.getValues();
      expect(values).to.have.lengthOf(4);
      expect(values[0]).to.be.false;
      expect(values[1]).to.equal(1);
      expect(values[2]).to.equal('two');
      expect(values[3]).to.equal(3.0);
    });
  });
});
