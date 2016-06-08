'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

var levelId = 0;var 

Level = function () {



  function Level(theme) {_classCallCheck(this, Level);this._map = null;this.id = levelId++;
    this._theme = theme;}_createClass(Level, [{ key: 'getTileAt', value: function getTileAt(












    point) {
      var row = this._map[point.x];
      if (!row) 
      return;
      return row[point.y];} }, { key: 'map', get: function get() {return this._map;}, set: function set(map) {this._map = map;if (map) this._map.level = this;} }]);return Level;}();exports.default = 



Level;
//# sourceMappingURL=Level.js.map
