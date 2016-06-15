'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _rotJs = require('rot-js');var _rotJs2 = _interopRequireDefault(_rotJs);
var _ComponentGenerator = require('./ComponentGenerator');var _ComponentGenerator2 = _interopRequireDefault(_ComponentGenerator);
var _EntityGenerator = require('./EntityGenerator');var _EntityGenerator2 = _interopRequireDefault(_EntityGenerator);
var _LevelGenerator = require('./LevelGenerator');var _LevelGenerator2 = _interopRequireDefault(_LevelGenerator);
var _Engine = require('./Engine');var _Engine2 = _interopRequireDefault(_Engine);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 

Game = function () {function Game() {_classCallCheck(this, Game);this.
    seed = null;this.
    levels = null;this.
    engine = null;}_createClass(Game, [{ key: 'start', value: function start() 

    {
      this.engine.unlock();} }]);return Game;}();var 



GameGenerator = function () {function GameGenerator() {_classCallCheck(this, GameGenerator);this.
    LevelGenerator = _LevelGenerator2.default;}_createClass(GameGenerator, [{ key: 'generate', value: function generate() 
    {var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var game = new Game();
      game.seed = _rotJs2.default.RNG.seed;
      game.levels = this._generateLevels(options.numberOfLevels || 0);
      game.engine = new _Engine2.default();
      return game;} }, { key: '_generateLevels', value: function _generateLevels(


    numberOfLevels) {
      var levels = {};
      var levelGenerator = new this.LevelGenerator();
      for (var i = 0; i < numberOfLevels; i++) {
        var level = levelGenerator.generateRandom();
        level.id = 1;
        levels[level.id] = level;}

      return levels;} }]);return GameGenerator;}();exports.default = 




GameGenerator;
//# sourceMappingURL=GameGenerator.js.map
