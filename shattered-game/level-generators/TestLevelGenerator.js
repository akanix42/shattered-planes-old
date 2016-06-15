'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.default = undefined;var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();

var _Level = require('shattered-lib/Level');var _Level2 = _interopRequireDefault(_Level);
var _Map = require('shattered-lib/Map');var _Map2 = _interopRequireDefault(_Map);
var _Tile = require('shattered-lib/Tile');var _Tile2 = _interopRequireDefault(_Tile);
var _Point = require('shattered-lib/Point');var _Point2 = _interopRequireDefault(_Point);
var _EntityGenerator = require('shattered-lib/generators/EntityGenerator');var _EntityGenerator2 = _interopRequireDefault(_EntityGenerator);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 

TestLevelGenerator = function () {function TestLevelGenerator() {_classCallCheck(this, TestLevelGenerator);this.
    _entityGenerator = new _EntityGenerator2.default();this.
    theme = 'test';}_createClass(TestLevelGenerator, [{ key: 'generate', value: function generate() 

    {
      var level = new _Level2.default(this._theme);
      level.map = this._generateMap();
      return level;} }, { key: '_generateMap', value: function _generateMap() 



    {
      var generateTile = _generateTile.bind(this);
      var map = new _Map2.default();
      var size = 20;
      var tiles = map.tiles = new Array(size);
      for (var x = 0; x < tiles.length; x++) {
        tiles[x] = new Array(size);}

      for (var _x = 0; _x < tiles.length; _x++) {
        for (var y = 0, column = tiles[_x]; y < column.length; y++) {
          column[y] = generateTile(_x, y);}}

      return map;


      function _generateTile(x, y) {
        var tile = new _Tile2.default(new _Point2.default(x, y), map);
        tile.addEntity(this._entityGenerator.generate('dirtFloor'));
        return tile;}} }]);return TestLevelGenerator;}();exports.default = TestLevelGenerator;




TestLevelGenerator.__type__ = 'TestLevelGenerator';
//# sourceMappingURL=TestLevelGenerator.js.map
