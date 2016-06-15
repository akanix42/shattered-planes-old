'use strict';
var _chai = require('chai');var _chai2 = _interopRequireDefault(_chai);
var _LevelGenerator = require('./LevelGenerator');var _LevelGenerator2 = _interopRequireDefault(_LevelGenerator);
var _EntityGenerator = require('./EntityGenerator');var _EntityGenerator2 = _interopRequireDefault(_EntityGenerator);
var _rotJs = require('rot-js');var _rotJs2 = _interopRequireDefault(_rotJs);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_chai2.default.should();

describe('LevelGenerator', function () {

  describe('generate', function () {
    it('should generate a level', function () {
      var testLevel = {};
      var generator = { theme: 'test', generate: function generate() {return testLevel;} };
      var levelGenerator = new _LevelGenerator2.default();
      levelGenerator.addGenerator(generator);

      var level = levelGenerator.generateRandom();
      level.should.equal(testLevel);});});




  describe('getRandomGenerator()', function () {
    it('should return a random theme', function () {
      _rotJs2.default.RNG.setSeed(1345646);
      var generator = { theme: '1' };
      var generator2 = { theme: '2' };
      var generator3 = { theme: '3' };

      _LevelGenerator2.default._generators = {};
      var levelGenerator = new _LevelGenerator2.default();
      levelGenerator.addGenerator(generator);
      levelGenerator.addGenerator(generator2);
      levelGenerator.addGenerator(generator3);
      var randomGenerator = levelGenerator.getRandomGenerator();
      randomGenerator.should.equal(generator);
      randomGenerator = levelGenerator.getRandomGenerator();
      randomGenerator.should.equal(generator);
      randomGenerator = levelGenerator.getRandomGenerator();
      randomGenerator.should.equal(generator3);});});});
//# sourceMappingURL=LevelGenerator.tests.js.map
