'use strict';
var _CollisionComponent = require('./CollisionComponent');var _CollisionComponent2 = _interopRequireDefault(_CollisionComponent);
var _events = require('f:/projects/shattered-planes/shattered-game/shattered-game/src/events');var _events2 = _interopRequireDefault(_events);
var _Entity = require('shattered-lib/Entity');var _Entity2 = _interopRequireDefault(_Entity);
var _chai = require('chai');var _chai2 = _interopRequireDefault(_chai);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_chai2.default.should();

describe('CollisionComponent', function () {
  describe('onPosition', function () {
    it('should emit a willNotCollide event', function () {
      var collisionComponent = new _CollisionComponent2.default();
      var entity = new _Entity2.default();
      entity.addComponent(collisionComponent);

      var result = {};
      var destination = { 
        emit: function emit(event) {
          result = event;} };


      collisionComponent.onPosition({ destination: destination });
      result.should.eql({ name: _events2.default.willNotCollide, entity: entity });});


    it('should return the result of the willNotCollide event', function () {
      var collisionComponent = new _CollisionComponent2.default();
      var entity = new _Entity2.default();
      entity.addComponent(collisionComponent);

      var expectedResult = 'test';
      var destination = { 
        emit: function emit(event) {
          return expectedResult;} };


      var result = collisionComponent.onPosition({ destination: destination });
      result.should.equal(expectedResult);});});




  describe('Handlers', function () {
    it('should listen to onPosition events', function () {
      var collisionComponent = new _CollisionComponent2.default();
      collisionComponent.handlers.find(function (handler) {return handler.eventName === _events2.default.move;}).should.be.ok;});


    it('should listen to willNotCollide events', function () {
      var collisionComponent = new _CollisionComponent2.default();
      collisionComponent.handlers.find(function (handler) {return handler.eventName === _events2.default.willNotCollide;}).should.be.ok;});});});
//# sourceMappingURL=CollisionComponent.tests.js.map
