'use strict';var _NormalMovementComponent = require('./NormalMovementComponent');var _NormalMovementComponent2 = _interopRequireDefault(_NormalMovementComponent);
var _events = require('f:/projects/shattered-planes/shattered-game/shattered-game/src/events');var _events2 = _interopRequireDefault(_events);
var _Entity = require('shattered-lib/Entity');var _Entity2 = _interopRequireDefault(_Entity);
var _chai = require('chai');var _chai2 = _interopRequireDefault(_chai);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_chai2.default.should();

describe('NormalMovementComponent', function () {
  describe('onMove', function () {
    it('should calculate the time cost', function () {
      var movementComponent = new _NormalMovementComponent2.default();
      var entity = new _Entity2.default();
      entity.addComponent(movementComponent);
      entity.attributes.add('moveSpeed', 1000);

      var destination = {};
      var result = movementComponent.onMove({ destination: destination });
      result.should.equal(1000);});});





  describe('Handlers', function () {
    it('should listen to move events', function () {
      var movementComponent = new _NormalMovementComponent2.default();
      movementComponent.handlers.find(function (handler) {return handler.eventName === _events2.default.move;}).should.be.ok;});});});
//# sourceMappingURL=NormalMovementComponent.tests.js.map
