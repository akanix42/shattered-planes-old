'use strict';
var _chai = require('chai');var _chai2 = _interopRequireDefault(_chai);
var _Tile = require('./Tile.js');var _Tile2 = _interopRequireDefault(_Tile);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_chai2.default.should();

describe('Tile', function () {

  describe('point', function () {
    it('should return the tile`s point coordinates', function () {
      var point = {};
      var tile = new _Tile2.default(point, {});
      tile.point.should.equal(point);});});



  describe('level', function () {
    it('should return the tile`s level', function () {
      var level = {};
      var tile = new _Tile2.default({}, { level: level });
      tile.level.should.equal(level);});});



  describe('addEntity()', function () {

    it('should add the entity', function () {
      var tile = new _Tile2.default();
      tile.addEntity({}, 0);});});});
//# sourceMappingURL=Tile.tests.js.map
