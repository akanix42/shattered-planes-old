'use strict';
var _chai = require('chai');var _chai2 = _interopRequireDefault(_chai);
var _Level = require('./Level.js');var _Level2 = _interopRequireDefault(_Level);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_chai2.default.should();

describe('Level', function () {

  describe('get map()', function () {
    it('should return the level\'s map', function () {
      var map = {};
      var level = new _Level2.default();
      level._map = map;
      level.map.should.equal(map);});});



  describe('set map()', function () {
    it('should set the level\'s map', function () {
      var map = {};
      var level = new _Level2.default();
      level.map = map;
      level.map.should.equal(map);
      level.map.level.should.equal(level);});});



  describe('getTileAt()', function () {
    it('should get the tile at the given point', function () {
      var map = {};
      var level = new _Level2.default();
      level.map = map;
      level.map.should.equal(map);
      level.map.level.should.equal(level);});});});
//# sourceMappingURL=Level.tests.js.map
