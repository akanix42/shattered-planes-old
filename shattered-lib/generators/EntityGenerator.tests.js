'use strict';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _EntityGenerator = require('./EntityGenerator');var _EntityGenerator2 = _interopRequireDefault(_EntityGenerator);
var _chai = require('chai');var _chai2 = _interopRequireDefault(_chai);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

_chai2.default.should();

describe('EntityGenerator', function () {

  describe('generate', function () {
    it('should generate an entity of the supplied type', function () {
      var testTemplate = { 
        name: 'test' };

      var entityGenerator = new _EntityGenerator2.default();
      _EntityGenerator2.default._templates[testTemplate.name] = testTemplate;

      var entity = entityGenerator.generate('test');
      entity.template.should.equal(testTemplate);

      delete _EntityGenerator2.default._templates[testTemplate.name];});


    it('should add all of the template\'s components to the entity', function () {
      var testTemplate = { 
        name: 'test', 
        components: ['component1', 'component2'] };

      var addedComponents = [];var 
      Entity = function () {function Entity() {_classCallCheck(this, Entity);}_createClass(Entity, [{ key: 'addComponent', value: function addComponent(
          component) {
            addedComponents.push(component);} }]);return Entity;}();


      var entityGenerator = new _EntityGenerator2.default();
      _EntityGenerator2.default._templates[testTemplate.name] = testTemplate;
      entityGenerator._Entity = Entity;
      entityGenerator._componentGenerator = { generate: function generate(componentName) {return { componentName: componentName };} };

      entityGenerator.generate('test');
      addedComponents[0].should.eql({ componentName: 'component1' });
      addedComponents[1].should.eql({ componentName: 'component2' });

      delete _EntityGenerator2.default._templates[testTemplate.name];});});});
//# sourceMappingURL=EntityGenerator.tests.js.map
