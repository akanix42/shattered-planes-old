'use strict';
var _chai = require('chai');var _chai2 = _interopRequireDefault(_chai);
var _jsonc = require('jsonc');var _jsonc2 = _interopRequireDefault(_jsonc);
var _Component = require('./Component.js');var _Component2 = _interopRequireDefault(_Component);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_chai2.default.should();

describe('Component', function () {

  describe('constructor', function () {
    it('should instantiate the stats object', function () {
      var component = new _Component2.default();

      component._stats.should.be.ok;});});



  describe('_addHandler', function () {
    it('should add the handler', function () {
      var component = new _Component2.default();
      component.addHandler({});
      component.handlers.length.should.equal(1);});


    it('should supply the event name, priority, callback, and component', function () {
      var component = new _Component2.default();
      var eventName = 'test', priority = 10, callback = function callback() {return null;};

      component.addHandler('test', 10, callback);

      var handler = component.handlers[0];
      handler.eventName.should.equal(eventName);
      handler.priority.should.equal(priority);
      handler.callback.should.equal(callback);
      handler.component.should.equal(component);});});




  describe('serialization', function () {
    it('should be serializable', function () {
      _Component2.default.__type__.should.equal('Component');});


    it('should deserialize properly', function () {
      var originalComponent = new _Component2.default();
      originalComponent._stats.test = 'test';
      var serializedData = _jsonc2.default.serialize({ component: originalComponent });
      var deserializedComponent = _jsonc2.default.deserialize(serializedData).component;
      deserializedComponent._stats.test.should.equal('test');});});});
//# sourceMappingURL=Component.tests.js.map
