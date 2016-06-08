'use strict';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _chai = require('chai');var _chai2 = _interopRequireDefault(_chai);
var _LevelGenerator = require('./LevelGenerator');var _LevelGenerator2 = _interopRequireDefault(_LevelGenerator);
var _EntityGenerator = require('./EntityGenerator');var _EntityGenerator2 = _interopRequireDefault(_EntityGenerator);
var _rotJs = require('rot-js');var _rotJs2 = _interopRequireDefault(_rotJs);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

_chai2.default.should();

describe('LevelGenerator', function () {

  describe('generate', function () {
    it('should generate a level', function () {
      var testLevel = {};
      var generator = { theme: 'test', generate: function generate() {return testLevel;} };
      var levelGenerator = new _LevelGenerator2.default();
      levelGenerator.addGenerator(generator);

      var level = levelGenerator.generateRandom();
      level.should.equal(testLevel);});


    it('should add all of the template\'s components to the entity', function () {
      var testTemplate = { 
        name: 'test', 
        components: ['component1', 'component2'] };

      var addedComponents = [];var 
      Entity = function () {function Entity() {_classCallCheck(this, Entity);}_createClass(Entity, [{ key: 'addComponent', value: function addComponent(
          component) {
            addedComponents.push(component);} }]);return Entity;}();


      var entityGenerator = new _EntityGenerator2.default();
      entityGenerator._Entity = Entity;
      entityGenerator._templates[testTemplate.name] = testTemplate;
      entityGenerator._componentGenerator = { generate: function generate(componentName) {return { componentName: componentName };} };

      entityGenerator.generate('test');
      addedComponents[0].should.eql({ componentName: 'component1' });
      addedComponents[1].should.eql({ componentName: 'component2' });});});



  describe('getRandomGenerator()', function () {
    it('should return a random theme', function () {
      _rotJs2.default.RNG.setSeed(1345646);
      var generator = { theme: '1' };
      var generator2 = { theme: '2' };
      var generator3 = { theme: '3' };

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
