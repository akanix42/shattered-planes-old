'use strict';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _chai = require('chai');var _chai2 = _interopRequireDefault(_chai);
var _GameGenerator = require('./GameGenerator.js');var _GameGenerator2 = _interopRequireDefault(_GameGenerator);
var _rotJs = require('rot-js');var _rotJs2 = _interopRequireDefault(_rotJs);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

_chai2.default.should();

describe('GameGenerator', function () {

  describe('generate', function () {
    it('should create a new game', function () {
      var gameGenerator = new _GameGenerator2.default();
      var game = gameGenerator.generate();
      game.should.be.ok;});


    it('should record the current ROT js seed', function () {
      var gameGenerator = new _GameGenerator2.default();
      var seed = 123;
      _rotJs2.default.RNG.seed = seed;
      var game = gameGenerator.generate();
      game.seed.should.equal(seed);});


    it('should generate the specified number of levels', function () {
      var callCounter = 0;
      var gameGenerator = new _GameGenerator2.default();
      gameGenerator.LevelGenerator = function () {function LevelGenerator() {_classCallCheck(this, LevelGenerator);}_createClass(LevelGenerator, [{ key: 'generateRandom', value: function generateRandom() 
          {
            callCounter++;
            return {};} }]);return LevelGenerator;}();


      gameGenerator.generate({ numberOfLevels: 22 });
      callCounter.should.equal(22);});});});
//# sourceMappingURL=GameGenerator.tests.js.map
