'use strict';var _PositionComponent = require('./PositionComponent');var _PositionComponent2 = _interopRequireDefault(_PositionComponent);
var _events = require('f:/projects/shattered-planes/shattered-game/shattered-game/src/events');var _events2 = _interopRequireDefault(_events);
var _Entity = require('shattered-lib/Entity');var _Entity2 = _interopRequireDefault(_Entity);
var _Tile = require('shattered-lib/Tile');var _Tile2 = _interopRequireDefault(_Tile);
var _chai = require('chai');var _chai2 = _interopRequireDefault(_chai);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_chai2.default.should();

describe('OccupantComponent', function () {
  describe('onPosition', function () {
    it('should update the entity\'s tile', function () {
      var occupantComponent = new OccupantComponent();
      var entity = new _Entity2.default();
      entity.addComponent(occupantComponent);

      var destination = new _Tile2.default();
      occupantComponent.onPosition({ destination: destination });
      entity.tile.should.equal(destination);});});



  describe('Handlers', function () {
    it('should listen to onMove events', function () {
      var occupantComponent = new OccupantComponent();
      var entity = new _Entity2.default();
      entity.addComponent(occupantComponent);

      var destination = new _Tile2.default();
      entity.emit({ name: _events2.default.move, destination: destination });
      entity.tile.should.equal(destination);});});});
//# sourceMappingURL=OccupantComponent.tests.js.map
