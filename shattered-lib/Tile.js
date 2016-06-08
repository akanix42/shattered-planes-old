'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _EntitiesByPriority = require('./EntitiesByPriority');var _EntitiesByPriority2 = _interopRequireDefault(_EntitiesByPriority);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 

Tile = function () {


  function Tile(point, map) {_classCallCheck(this, Tile);this._entities = new _EntitiesByPriority2.default();
    // super();
    this.point = point;
    this.map = map;}_createClass(Tile, [{ key: 'addEntity', value: function addEntity(






    entity, priority) {
      this._entities.add(entity, priority);} }, { key: 'getEntitiesInSpace', value: function getEntitiesInSpace(


    space) {
      var updatedEvent = this._entities.emit({ name: 'onGet.location.space', space: space });
      return updatedEvent.entities;} }, { key: 'level', get: function get() {return this.map.level;} }]);return Tile;}();exports.default = 



Tile;
//# sourceMappingURL=Tile.js.map
