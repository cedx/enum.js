/* tslint:disable: no-unused-expression */
import {expect} from 'chai';
import {suite, test} from 'mocha-typescript';
import {Enum} from '../src';

// tslint:disable:next-line: variable-name
const SampleEnum = Enum.create<any>({
  /* tslint:disable: object-literal-sort-keys */
  ZERO: false,
  ONE: 1,
  TWO: 'two',
  THREE: 3.0
  /* tslint:enable: object-literal-sort-keys */
});

/**
 * Tests the features of the `Enum` class.
 */
@suite class EnumTest {

  /**
   * Tests the `Enum#assert()` method.
   */
  @test testAssert(): void {
    // It should return the specified value if it is a known one.
    expect(SampleEnum.assert(false)).to.equal(SampleEnum.ZERO);
    expect(SampleEnum.assert(1)).to.equal(SampleEnum.ONE);
    expect(SampleEnum.assert('two')).to.equal(SampleEnum.TWO);
    expect(SampleEnum.assert(3.0)).to.equal(SampleEnum.THREE);

    // It should throw an exception if it is an unknown value.
    expect(() => SampleEnum.assert('')).to.throw(TypeError);
    expect(() => SampleEnum.assert('TWO')).to.throw(TypeError);
    expect(() => SampleEnum.assert(3.1)).to.throw(TypeError);
  }

  /**
   * Tests the `Enum.create()` method.
   */
  @test testCreate(): void {
    // @ts-ignore: it should create types that are not instantiable.
    expect(() => new SampleEnum).to.throw(TypeError);

    // It should create types that are immutable.
    expect(SampleEnum).to.be.frozen;

    // It should create types having the `Enum` mixins.
    expect(SampleEnum.assert).to.be.a('function');
    expect(SampleEnum.coerce).to.be.a('function');
    expect(SampleEnum.entries).to.be.a('function');
    expect(SampleEnum.isDefined).to.be.a('function');
    expect(SampleEnum.getIndex).to.be.a('function');
    expect(SampleEnum.getName).to.be.a('function');
    expect(SampleEnum.names).to.be.a('function');
    expect(SampleEnum.values).to.be.a('function');
  }

  /**
   * Tests the `Enum#coerce()` method.
   */
  @test testCoerce(): void {
    // It should return the specified value if it is a known one.
    expect(SampleEnum.coerce(false)).to.equal(SampleEnum.ZERO);
    expect(SampleEnum.coerce(1)).to.equal(SampleEnum.ONE);
    expect(SampleEnum.coerce('two')).to.equal(SampleEnum.TWO);
    expect(SampleEnum.coerce(3.0)).to.equal(SampleEnum.THREE);

    // It should return the default value if it is an unknown one.
    expect(SampleEnum.coerce('')).to.be.undefined;
    expect(SampleEnum.coerce('TWO', false)).to.be.false;
    expect(SampleEnum.coerce(3.1, SampleEnum.ZERO)).to.equal(SampleEnum.ZERO);
  }

  /**
   * Tests the `Enum#entries()` method.
   */
  @test testEntries(): void {
    // It should return the pairs of names and values of the enumerated constants.
    const entries = SampleEnum.entries();
    expect(entries).to.have.lengthOf(4);
    for (const entry of entries) expect(entry).to.be.an('array').and.have.lengthOf(2);

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
  }

  /**
   * Tests the `Enum#getIndex()` method.
   */
  @test testGetIndex(): void {
    // It should return `-1` for unknown values.
    expect(SampleEnum.getIndex(0)).to.equal(-1);
    expect(SampleEnum.getIndex('TWO')).to.equal(-1);
    expect(SampleEnum.getIndex(3.1)).to.equal(-1);

    // It should return the index of the enumerated constant for known values.
    expect(SampleEnum.getIndex(false)).to.equal(0);
    expect(SampleEnum.getIndex(1)).to.equal(1);
    expect(SampleEnum.getIndex('two')).to.equal(2);
    expect(SampleEnum.getIndex(3.0)).to.equal(3);
  }

  /**
   * Tests the `Enum#getName()` method.
   */
  @test testGetName(): void {
    // It should return an empty string for unknown values.
    expect(SampleEnum.getName(0)).to.be.empty;
    expect(SampleEnum.getName('TWO')).to.be.empty;
    expect(SampleEnum.getName(3.1)).to.be.empty;

    // It should return the name for known values.
    expect(SampleEnum.getName(false)).to.equal('ZERO');
    expect(SampleEnum.getName(1)).to.equal('ONE');
    expect(SampleEnum.getName('two')).to.equal('TWO');
    expect(SampleEnum.getName(3.0)).to.equal('THREE');
  }

  /**
   * Tests the `Enum#isDefined()` method.
   */
  @test testIsDefined(): void {
    // It should return `false` for unknown values.
    expect(SampleEnum.isDefined(0)).to.be.false;
    expect(SampleEnum.isDefined('TWO')).to.be.false;
    expect(SampleEnum.isDefined(3.1)).to.be.false;

    // It should return `true` for known values.
    expect(SampleEnum.isDefined(false)).to.be.true;
    expect(SampleEnum.isDefined(1)).to.be.true;
    expect(SampleEnum.isDefined('two')).to.be.true;
    expect(SampleEnum.isDefined(3.0)).to.be.true;
  }

  /**
   * Tests the `Enum#names()` method.
   */
  @test testNames(): void {
    // It should return the names of the enumerable properties.
    const names = SampleEnum.names();
    expect(names).to.have.lengthOf(4);
    expect(names[0]).to.equal('ZERO');
    expect(names[1]).to.equal('ONE');
    expect(names[2]).to.equal('TWO');
    expect(names[3]).to.equal('THREE');
  }

  /**
   * Tests the `Enum#values()` method.
   */
  @test testValues(): void {
    // It should return the values of the enumerable properties.
    const values = SampleEnum.values();
    expect(values).to.have.lengthOf(4);
    expect(values[0]).to.be.false;
    expect(values[1]).to.equal(1);
    expect(values[2]).to.equal('two');
    expect(values[3]).to.equal(3.0);
  }
}
