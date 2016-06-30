'use strict';
import chai from 'chai';
import jsonc from 'shattered-lib/lib/jsonc';
import Attributes, {Attribute, AttributeModifiers} from './Attributes.js';

chai.should();

describe('Attributes', () => {

  describe('constructor', ()=> {
    it('should work with no parameters', () => {
      const attributes = new Attributes();
      attributes.should.be.ok;
    });

    it('should instantiate each supplied attribute', () => {
      const initialAttributes = {
        health: 10,
        speed: 5
      };
      const attributes = new Attributes(initialAttributes);
      attributes.health.current.should.equal(initialAttributes.health);
      attributes.speed.current.should.equal(initialAttributes.speed);
    });

  });

  describe('add', ()=> {

    it('should add the supplied attribute', () => {
      const attributes = new Attributes();
      const speed = 5;
      attributes.add('speed', speed);
      attributes.speed.current.should.equal(speed);

    });

  });

});

describe('Attribute', () => {
  describe('constructor', ()=> {
    it('should instantiate the attribute with the supplied name, value, and maxValue', () => {
      const attribute = new Attribute('test', 3, 4);
      attribute.name.should.equal('test');
      attribute._base.should.equal(3);
      attribute._baseMax.should.equal(4);
    });
  });

  describe('get base()', ()=> {
    it('should return the base value', () => {
      const attribute = new Attribute();
      attribute._base = 5;
    });
  });

  describe('set base()', ()=> {
    it('should set the base value to no more than the baseMax', () => {
      const attribute = new Attribute();
      attribute.baseMax = 5;
      attribute.base = 6;
      attribute.base.should.equal(5);
    });
  });

  describe('get current()', ()=> {
    it('should return the base value when no modifiers have been added', () => {
      const attribute = new Attribute();
      attribute.base = 5;
      attribute.current.should.equal(5);
    });

    it('should return the base value + the sum of the modifiers', () => {
      const attribute = new Attribute();
      attribute.base = 5;
      attribute.modifiers.add({}, 'test', 3)
      attribute.modifiers.add({}, 'test', -1)
      attribute.current.should.equal(7);
    });
  });

});
describe('AttributeModifiers', () => {

  describe('add()', ()=> {
    it('should add the modifier and recalculate the total', () => {
      const modifiers = new AttributeModifiers();
      modifiers.add({}, 'test', 2);
      modifiers.total.should.equal(2);
    });

    it('should add multiple modifiers and recalculate the total', () => {
      const modifiers = new AttributeModifiers();
      modifiers.add({}, 'test', 2);
      modifiers.add({}, 'test', -1);
      modifiers.total.should.equal(1);
    });

    it('should replace the existing modifier and recalculate the total', () => {
      const modifiers = new AttributeModifiers();
      const component = {};
      modifiers.add(component, 'test', 1);
      modifiers.total.should.equal(1);
      modifiers.add(component, 'test', 2);
      modifiers.total.should.equal(2);
    });

    it('should remove the existing modifier and recalculate the total', () => {
      const modifiers = new AttributeModifiers();
      const component = {};
      modifiers.add(component, 'test', 1);
      modifiers.total.should.equal(1);
      modifiers.remove(component, 'test');
      modifiers.total.should.equal(0);
    });

  });

  describe('set base()', ()=> {
    it('should set the base value to no more than the baseMax', () => {
      const attribute = new Attribute();
      attribute.baseMax = 5;
      attribute.base = 6;
      attribute.base.should.equal(5);
    });
  });

  describe('get current()', ()=> {
    it('should return the base value when no modifiers have been added', () => {
      const attribute = new Attribute();
      attribute.base = 5;
      attribute.current.should.equal(5);
    });

    it('should return the base value + the sum of the modifiers', () => {
      const attribute = new Attribute();
      attribute.base = 5;
      attribute.modifiers.add({}, 'test', 3)
      attribute.modifiers.add({}, 'test', -1)
      attribute.current.should.equal(7);
    });
  });

});
