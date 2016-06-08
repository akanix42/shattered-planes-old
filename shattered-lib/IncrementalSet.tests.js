'use strict';
var _chai = require('chai');var _chai2 = _interopRequireDefault(_chai);
var _IncrementalSet = require('./IncrementalSet.js');var _IncrementalSet2 = _interopRequireDefault(_IncrementalSet);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_chai2.default.should();

describe('IncrementalSet', function () {
  describe('add', function () {

    it('should add a value to the set', function () {
      var set = new _IncrementalSet2.default();
      set.add('test');});


    it('should allow adding a value multiple times', function () {
      var set = new _IncrementalSet2.default();
      set.add('test');
      set.add('test');});});




  describe('has', function () {

    it('should return false if the value has not been added to the set', function () {
      var set = new _IncrementalSet2.default();
      set.has('test').should.be.false;});


    it('should return true if the value has been added to the set', function () {
      var set = new _IncrementalSet2.default();
      set.add('test');
      set.has('test').should.be.true;});});




  describe('delete', function () {

    it('should remove a value from the set', function () {
      var set = new _IncrementalSet2.default();
      set.add('test');
      set.delete('test');
      set.has('test').should.be.false;});


    it('should only remove one "instance" of a value from the set each time it is called', function () {
      var set = new _IncrementalSet2.default();
      set.add('test');
      set.add('test');
      set.delete('test');
      set.has('test').should.be.true;
      set.delete('test');
      set.has('test').should.be.false;});});});
//# sourceMappingURL=IncrementalSet.tests.js.map
