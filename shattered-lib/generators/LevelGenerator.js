'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _rotJs = require('rot-js');var _rotJs2 = _interopRequireDefault(_rotJs);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 

LevelGenerator = function () {function LevelGenerator() {_classCallCheck(this, LevelGenerator);}_createClass(LevelGenerator, [{ key: 'addGenerator', value: function addGenerator(

    generator) {
      LevelGenerator._generators[generator.theme] = generator;} }, { key: 'generateRandom', value: function generateRandom() 


    {
      var generator = this.getRandomGenerator();
      return generator.generate();} }, { key: 'getRandomGenerator', value: function getRandomGenerator() 


    {
      var themes = Object.keys(LevelGenerator._generators);
      return LevelGenerator._generators[themes.random()];} }]);return LevelGenerator;}();



LevelGenerator._generators = {};exports.default = 

LevelGenerator;
//# sourceMappingURL=LevelGenerator.js.map
