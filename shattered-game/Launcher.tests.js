'use strict';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _chai = require('chai');var _chai2 = _interopRequireDefault(_chai);
var _Launcher = require('./Launcher.js');var _Launcher2 = _interopRequireDefault(_Launcher);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

_chai2.default.should();

describe('Launcher', function () {

  describe('startNewGame', function () {
    it('should call the new game generator', function () {
      var wasCalled = false;
      var launcher = new _Launcher2.default();
      launcher.GameGenerator = function () {function GameGenerator() {_classCallCheck(this, GameGenerator);}_createClass(GameGenerator, [{ key: 'generate', value: function generate() 
          {
            wasCalled = true;} }]);return GameGenerator;}();


      launcher.startNewGame();

      wasCalled.should.be.true;});});




  describe('loadSavedGame', function () {
    it('should call the saved game loader with the game id', function () {
      var wasCalledWithGameId = false;
      var gameId = 1234;
      var launcher = new _Launcher2.default();
      launcher.GameLoader = function () {function GameLoader() {_classCallCheck(this, GameLoader);}_createClass(GameLoader, [{ key: 'load', value: function load(
          passedIngameId) {
            wasCalledWithGameId = passedIngameId === gameId;} }]);return GameLoader;}();


      launcher.loadSavedGame(gameId);

      wasCalledWithGameId.should.be.true;});});});
//# sourceMappingURL=Launcher.tests.js.map
