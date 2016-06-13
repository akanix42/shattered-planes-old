'use strict';var _PositionComponent = require('./PositionComponent');var _PositionComponent2 = _interopRequireDefault(_PositionComponent);
var _events = require('f:/projects/shattered-planes/shattered-game/shattered-game/src/events');var _events2 = _interopRequireDefault(_events);
var _Entity = require('shattered-lib/Entity');var _Entity2 = _interopRequireDefault(_Entity);
var _chai = require('chai');var _chai2 = _interopRequireDefault(_chai);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_chai2.default.should();

describe('PositionComponent', function () {
  describe('onPosition', function () {
    it('should update the entity\'s tile', function () {
      var positionConent = new _PositionComponent2.default();
      var entity = new _Entity2.default();
      entity.addComponent(positionConent);

      var destination = {};
      positionConent.onPosition({ destination: destination });
      entity.tile.should.equal(destination);});});



  describe('Handlers', function () {
    it('should listen to onMove events', function () {
      var positionConent = new _PositionComponent2.default();
      var entity = new _Entity2.default();
      entity.addComponent(positionConent);

      var destination = {};
      entity.emit({ name: _events2.default.move, destination: destination });
      entity.tile.should.equal(destination);});});});
//# sourceMappingURL=PositionComponent.tests.js.map
