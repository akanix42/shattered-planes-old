'use strict';
var _chai = require('chai');var _chai2 = _interopRequireDefault(_chai);
var _jsonc = require('jsonc');var _jsonc2 = _interopRequireDefault(_jsonc);
var _Attributes = require('./Attributes.js');var _Attributes2 = _interopRequireDefault(_Attributes);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_chai2.default.should();

describe('Attributes', function () {

  describe('constructor', function () {
    it('should work with no parameters', function () {
      var attributes = new _Attributes2.default();
      attributes.should.be.ok;});


    it('should instantiate each supplied attribute', function () {
      var initialAttributes = { 
        health: 10, 
        speed: 5 };

      var attributes = new _Attributes2.default(initialAttributes);
      attributes.health.current.should.equal(initialAttributes.health);
      attributes.speed.current.should.equal(initialAttributes.speed);});});




  describe('add', function () {

    it('should add the supplied attribute', function () {
      var attributes = new _Attributes2.default();
      var speed = 5;
      attributes.add('speed', speed);
      attributes.speed.current.should.equal(speed);});});});







describe('Attribute', function () {
  describe('constructor', function () {
    it('should instantiate the attribute with the supplied name, value, and maxValue', function () {
      var attribute = new _Attributes.Attribute('test', 3, 4);
      attribute.name.should.equal('test');
      attribute._base.should.equal(3);
      attribute._baseMax.should.equal(4);});});



  describe('get base()', function () {
    it('should return the base value', function () {
      var attribute = new _Attributes.Attribute();
      attribute._base = 5;});});



  describe('set base()', function () {
    it('should set the base value to no more than the baseMax', function () {
      var attribute = new _Attributes.Attribute();
      attribute.baseMax = 5;
      attribute.base = 6;
      attribute.base.should.equal(5);});});



  describe('get current()', function () {
    it('should return the base value when no modifiers have been added', function () {
      var attribute = new _Attributes.Attribute();
      attribute.base = 5;
      attribute.current.should.equal(5);});


    it('should return the base value + the sum of the modifiers', function () {
      var attribute = new _Attributes.Attribute();
      attribute.base = 5;
      attribute.modifiers.add({}, 'test', 3);
      attribute.modifiers.add({}, 'test', -1);
      attribute.current.should.equal(7);});});});




describe('AttributeModifiers', function () {

  describe('add()', function () {
    it('should add the modifier and recalculate the total', function () {
      var modifiers = new _Attributes.AttributeModifiers();
      modifiers.add({}, 'test', 2);
      modifiers.total.should.equal(2);});


    it('should add multiple modifiers and recalculate the total', function () {
      var modifiers = new _Attributes.AttributeModifiers();
      modifiers.add({}, 'test', 2);
      modifiers.add({}, 'test', -1);
      modifiers.total.should.equal(1);});


    it('should replace the existing modifier and recalculate the total', function () {
      var modifiers = new _Attributes.AttributeModifiers();
      var component = {};
      modifiers.add(component, 'test', 1);
      modifiers.total.should.equal(1);
      modifiers.add(component, 'test', 2);
      modifiers.total.should.equal(2);});


    it('should remove the existing modifier and recalculate the total', function () {
      var modifiers = new _Attributes.AttributeModifiers();
      var component = {};
      modifiers.add(component, 'test', 1);
      modifiers.total.should.equal(1);
      modifiers.remove(component, 'test');
      modifiers.total.should.equal(0);});});




  describe('set base()', function () {
    it('should set the base value to no more than the baseMax', function () {
      var attribute = new _Attributes.Attribute();
      attribute.baseMax = 5;
      attribute.base = 6;
      attribute.base.should.equal(5);});});



  describe('get current()', function () {
    it('should return the base value when no modifiers have been added', function () {
      var attribute = new _Attributes.Attribute();
      attribute.base = 5;
      attribute.current.should.equal(5);});


    it('should return the base value + the sum of the modifiers', function () {
      var attribute = new _Attributes.Attribute();
      attribute.base = 5;
      attribute.modifiers.add({}, 'test', 3);
      attribute.modifiers.add({}, 'test', -1);
      attribute.current.should.equal(7);});});});
//# sourceMappingURL=Attributes.tests.js.map
