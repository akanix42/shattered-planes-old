'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _dec, _class;
var _jsonc = require('jsonc');
var _SubscribedHandlers = require('./SubscribedHandlers');var _SubscribedHandlers2 = _interopRequireDefault(_SubscribedHandlers);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 


Entity = (_dec = (0, _jsonc.serializable)('Entity'), _dec(_class = function () {function Entity() {_classCallCheck(this, Entity);this.
    _components = [];this.
    stats = {};this.
    subscribedHandlers = new _SubscribedHandlers2.default();this.
    tile = {};this.
    attributes = new Attributes();}_createClass(Entity, [{ key: 'addComponent', value: function addComponent(

    component) {
      if (component._key in this._components) 
      throw new Error('Component ' + _key + ' already exists for entity ' + _this);

      this._components[component._key] = component;
      component.entity = this;
      this.subscribeComponent(component);
      return this;} }, { key: 'removeComponent', value: function removeComponent(


    key) {
      var component = this._components[key];
      if (!component) 
      return;

      this.unsubscribeComponent(component);
      delete this._components[key];
      component.entity = null;} }, { key: 'addStat', value: function addStat(


    name) {var _this2 = this;
      if (name in this.stats) 
      return;

      Object.defineProperty(this.stats, name, { 
        get: function get() {return _this2.emit({ name: 'onStat.' + name });}, 
        configurable: true, 
        enumerable: true });} }, { key: 'removeStat', value: function removeStat(



    name) {
      delete this.stats[name];} }, { key: 'subscribeComponent', value: function subscribeComponent(


    component) {var _this3 = this;
      component.handlers.forEach(function (subscription) {return _this3.subscribedHandlers.add(subscription, component);});} }, { key: 'unsubscribeComponent', value: function unsubscribeComponent(


    component) {
      this.subscribedHandlers.removeComponent(component);} }, { key: 'emit', value: function emit(


    event) {
      return this.subscribedHandlers.emit(event);} }]);return Entity;}()) || _class);exports.default = 



Entity;
//# sourceMappingURL=Entity.js.map
