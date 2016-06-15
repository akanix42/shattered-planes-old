'use strict';
var _ArchitectureComponent = require('./ArchitectureComponent');var _ArchitectureComponent2 = _interopRequireDefault(_ArchitectureComponent);
var _events = require('f:/projects/shattered-planes/shattered-game/shattered-game/src/events');var _events2 = _interopRequireDefault(_events);
var _Entity = require('shattered-lib/Entity');var _Entity2 = _interopRequireDefault(_Entity);
var _Tile = require('shattered-lib/Tile');var _Tile2 = _interopRequireDefault(_Tile);
var _chai = require('chai');var _chai2 = _interopRequireDefault(_chai);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var expect = _chai2.default.expect;

describe('ArchitectureComponent', function () {
  describe('onPosition', function () {

    it('should set the current tile\'s architecture to it\'s entity', function () {
      var architectureComponent = new _ArchitectureComponent2.default();
      var entity = new _Entity2.default();
      var currentTile = new _Tile2.default();
      entity.addComponent(architectureComponent);

      architectureComponent.onPosition({ destination: currentTile });
      expect(currentTile.architecture).to.equal(entity);});


    it('should remove it\'s entity from the previous tile\'s architecture', function () {
      var architectureComponent = new _ArchitectureComponent2.default();
      var entity = new _Entity2.default();
      var previousTile = new _Tile2.default();
      entity.addComponent(architectureComponent);
      previousTile.architecture = entity;

      architectureComponent.onPosition({ destination: null });
      expect(previousTile.architecture).to.be.null;});});});
//# sourceMappingURL=ArchitectureComponent.tests.js.map
