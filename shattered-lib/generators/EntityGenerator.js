'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.default = undefined;var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();

var _Entity = require('../Entity');var _Entity2 = _interopRequireDefault(_Entity);
var _ComponentGenerator = require('./ComponentGenerator');var _ComponentGenerator2 = _interopRequireDefault(_ComponentGenerator);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 

EntityGenerator = function () {function EntityGenerator() {_classCallCheck(this, EntityGenerator);this.
    _templates = {};this.
    _componentGenerator = new _ComponentGenerator2.default();this.
    _Entity = _Entity2.default;}_createClass(EntityGenerator, [{ key: 'generate', value: function generate(

    templateName) {var _this = this;
      var template = this._templates[templateName];
      var entity = new this._Entity();
      entity.template = template;
      if (template.components) 
      template.components.forEach(function (componentName) {
        entity.addComponent(_this._componentGenerator.generate(componentName));});


      return entity;} }]);return EntityGenerator;}();exports.default = EntityGenerator;
//# sourceMappingURL=EntityGenerator.js.map
