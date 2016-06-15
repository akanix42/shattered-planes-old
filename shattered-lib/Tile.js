'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _EntitiesByPriority = require('./EntitiesByPriority');var _EntitiesByPriority2 = _interopRequireDefault(_EntitiesByPriority);
var _Inventory = require('./Inventory');var _Inventory2 = _interopRequireDefault(_Inventory);
var _SubscribedHandlers = require('./SubscribedHandlers');var _SubscribedHandlers2 = _interopRequireDefault(_SubscribedHandlers);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 


Tile = function () {





  function Tile(point, map) {_classCallCheck(this, Tile);this._architecture = null;this._handlers = new _SubscribedHandlers2.default();this.inventory = new _Inventory2.default();this.occupants = [];
    this.point = point;
    this.map = map;}_createClass(Tile, [{ key: 'addOccupant', value: function addOccupant(






















    occupant) {
      this.occupants.push(occupant);
      occupant.tile = this;

      this._addHandlers(occupant);} }, { key: 'removeOccupant', value: function removeOccupant(


    occupant) {
      var index = this.occupants.indexOf(occupant);
      if (index === -1) 
      return;

      this.occupants.splice(index, 1);
      occupant.tile = null;
      this._removeHandlers(occupant);} }, { key: '_addHandlers', value: function _addHandlers(


    entity) {var _this = this;
      var keys = Object.keys(entity.subscribedHandlers._handlersByEvent);
      keys.forEach(function (key) {
        entity.subscribedHandlers._handlersByEvent[key].forEach(function (handler) {return _this._handlers.add(handler);});});} }, { key: '_removeHandlers', value: function _removeHandlers(



    entity) {var _this2 = this;
      var keys = Object.keys(entity.subscribedHandlers._handlersByEvent);
      keys.forEach(function (key) {
        entity.subscribedHandlers._handlersByEvent[key].forEach(function (handler) {return _this2._handlers.remove(handler);});});} }, { key: 'level', get: function get() {return this.map.level;} }, { key: 'architecture', get: function get() {return this._architecture;}, set: function set(architecture) {var previousArchitecture = this._architecture;if (previousArchitecture) this._removeHandlers(previousArchitecture);this._architecture = architecture;if (architecture) {architecture.tile = this;this._addHandlers(architecture);}} }]);return Tile;}();exports.default = 




Tile;
//# sourceMappingURL=Tile.js.map
