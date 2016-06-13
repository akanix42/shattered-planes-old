'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 

AttributeModifiers = exports.AttributeModifiers = function () {function AttributeModifiers() {_classCallCheck(this, AttributeModifiers);this.
    _modifiers = [];this.
    _isUpdating = false;this.
    total = 0;}_createClass(AttributeModifiers, [{ key: 'add', value: function add(

    component, name, value) {
      this._isUpdating = true;

      this.remove(component, name);
      this._modifiers.push({ component: component, name: name, value: value });

      this._isUpdating = false;
      this.calculateTotal();} }, { key: 'remove', value: function remove(


    component, name) {
      var index = this._modifiers.findIndex(function (modifier) {return modifier.component === component && modifier.name === name;});
      if (index < 0) return;

      this._modifiers.splice(index, 1);
      this.calculateTotal();} }, { key: 'calculateTotal', value: function calculateTotal() 


    {
      if (this._isUpdating) return;
      this.total = this._modifiers.reduce(function (total, modifier) {return total + modifier.value;}, 0);} }]);return AttributeModifiers;}();var 



Attribute = exports.Attribute = function () {







  function Attribute(name, value, max) {_classCallCheck(this, Attribute);this._base = 0;this._bonus = 0;this.modifiers = new AttributeModifiers();this.baseMax = 0;this.name = null;
    this.name = name;
    this._base = value;
    this._baseMax = max;}_createClass(Attribute, [{ key: 'base', get: function get() 


    {
      return this._base;}, set: function set(


    value) {
      this._base = Math.min(value, this.baseMax || value);} }, { key: 'current', get: function get() 


    {
      return this._base + this.modifiers.total;} }]);return Attribute;}();var 




Attributes = function () {
  function Attributes() {var attributes = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];_classCallCheck(this, Attributes);
    var keys = Object.keys(attributes);
    for (var i = 0, attributeName = keys[i]; i < keys.length; i++, attributeName = keys[i]) {
      this.add(attributeName, attributes[attributeName]);}}_createClass(Attributes, [{ key: 'add', value: function add(


    attributeName, value) {
      if (!(attributeName in this)) 
      this[attributeName] = new Attribute(attributeName, value);} }]);return Attributes;}();exports.default = Attributes;
//# sourceMappingURL=Attributes.js.map
