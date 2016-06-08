'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 

IncrementalSet = function () {function IncrementalSet() {_classCallCheck(this, IncrementalSet);this.
    _items = new Map();}_createClass(IncrementalSet, [{ key: 'add', value: function add(

    value) {
      var count = (this._items.get(value) || 0) + 1;
      this._items.set(value, count);} }, { key: 'delete', value: function _delete(


    value) {
      var count = (this._items.get(value) || 0) - 1;

      if (count < 0) 
      return;

      if (count === 0) {
        this._items.delete(value);
        return;}


      this._items.set(value, count);} }, { key: 'has', value: function has(


    value) {
      return this._items.has(value);} }]);return IncrementalSet;}();exports.default = IncrementalSet;
//# sourceMappingURL=IncrementalSet.js.map
