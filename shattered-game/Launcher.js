'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _GameGenerator = require('./GameGenerator');var _GameGenerator2 = _interopRequireDefault(_GameGenerator);
var _GameLoader = require('./GameLoader');var _GameLoader2 = _interopRequireDefault(_GameLoader);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 

Launcher = function () {function Launcher() {_classCallCheck(this, Launcher);this.
    GameGenerator = _GameGenerator2.default;this.
    GameLoader = _GameLoader2.default;}_createClass(Launcher, [{ key: 'startNewGame', value: function startNewGame() 

    {
      var gameGenerator = new this.GameGenerator();
      gameGenerator.generate();} }, { key: 'loadSavedGame', value: function loadSavedGame(


    gameId) {
      var gameLoader = new this.GameLoader();
      gameLoader.load(gameId);} }]);return Launcher;}();exports.default = 



Launcher;
//# sourceMappingURL=Launcher.js.map
