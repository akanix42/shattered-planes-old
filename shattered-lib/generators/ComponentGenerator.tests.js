'use strict';
var _chai = require('chai');var _chai2 = _interopRequireDefault(_chai);
var _ComponentGenerator = require('./ComponentGenerator');var _ComponentGenerator2 = _interopRequireDefault(_ComponentGenerator);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

_chai2.default.should();

describe('ComponentGenerator', function () {

  describe('generate', function () {
    it('should return an instance of the requested component', function () {var 
      TestComponent = function TestComponent() {_classCallCheck(this, TestComponent);};


      var componentGenerator = new _ComponentGenerator2.default();
      componentGenerator._components['test'] = TestComponent;

      var component = componentGenerator.generate('test');
      component.should.be.instanceOf(TestComponent);});});});
//# sourceMappingURL=ComponentGenerator.tests.js.map
