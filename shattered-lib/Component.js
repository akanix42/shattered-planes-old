'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _dec, _class;
var _jsonc = require('jsonc');function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 


Component = (_dec = (0, _jsonc.serializable)('Component', { exclude: ['_handlers'] }), _dec(_class = function () {



  function Component(stats) {_classCallCheck(this, Component);this.entity = null;this._handlers = [];
    this._stats = stats || {};}_createClass(Component, [{ key: 'addHandler', value: function addHandler(


    eventName, priority, callback) {
      this._handlers.push({ eventName: eventName, priority: priority, callback: callback, component: this });} }]);return Component;}()) || _class);exports.default = 




Component;
//# sourceMappingURL=Component.js.map
