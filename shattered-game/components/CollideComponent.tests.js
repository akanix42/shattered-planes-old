'use strict';
var _CollideComponent = require('./CollideComponent');var _CollideComponent2 = _interopRequireDefault(_CollideComponent);
var _events = require('f:/projects/shattered-planes/shattered-game/shattered-game/src/events');var _events2 = _interopRequireDefault(_events);
var _Entity = require('shattered-lib/Entity');var _Entity2 = _interopRequireDefault(_Entity);
var _chai = require('chai');var _chai2 = _interopRequireDefault(_chai);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_chai2.default.should();

describe('CollideComponent', function () {
  describe('onPosition', function () {
    it('should emit a willNotCollide event', function () {
      var collideComponent = new _CollideComponent2.default();
      var entity = new _Entity2.default();
      entity.addComponent(collideComponent);

      var result = {};
      var destination = { 
        emit: function emit(event) {
          result = event;} };


      collideComponent.onPosition({ destination: destination });
      result.should.eql({ name: _events2.default.willNotCollide, entity: entity });});


    it('should return the result of the willNotCollide event', function () {
      var collideComponent = new _CollideComponent2.default();
      var entity = new _Entity2.default();
      entity.addComponent(collideComponent);

      var expectedResult = 'test';
      var destination = { 
        emit: function emit(event) {
          return expectedResult;} };


      var result = collideComponent.onPosition({ destination: destination });
      result.should.equal(expectedResult);});});




  describe('Handlers', function () {
    it('should listen to onPosition events', function () {
      var collideComponent = new _CollideComponent2.default();
      collideComponent.handlers.find(function (handler) {return handler.eventName === _events2.default.move;}).should.be.ok;});


    it('should listen to willNotCollide events', function () {
      var collideComponent = new _CollideComponent2.default();
      collideComponent.handlers.find(function (handler) {return handler.eventName === _events2.default.willNotCollide;}).should.be.ok;});});});
//# sourceMappingURL=CollideComponent.tests.js.map
