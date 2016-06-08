'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 

EntitiesByPriority = function () {function EntitiesByPriority() {_classCallCheck(this, EntitiesByPriority);this.
    _entitiesByPriority = [];this.
    _entities = new Set();}_createClass(EntitiesByPriority, [{ key: 'add', value: function add(

    entity, priority) {
      if (this._entities.has(entity)) 
      return;
      this._entitiesByPriority.push({ entity: entity, priority: priority });
      this._entitiesByPriority.sort(function (entityA, entityB) {return entityA.priority - entityB.priority;});
      this._entities.add(entity);} }, { key: 'emit', value: function emit(


    event) {
      for (var entityIndex = 0; entityIndex < this._entitiesByPriority.length; entityIndex++) {
        var entityEntry = this._entitiesByPriority[entityIndex];
        var result = entityEntry.entity.emit(event);
        if (result === false) 
        break;else 

        event = result || event;}

      return event;} }, { key: 'remove', value: function remove(


    entity) {
      if (!this._entities.has(entity)) 
      return;
      this._entitiesByPriority.splice(this._entitiesByPriority.findIndex(function (entry) {return entry.entity === entity;}), 1);
      this._entities.delete(entity);} }]);return EntitiesByPriority;}();exports.default = 



EntitiesByPriority;
//# sourceMappingURL=EntitiesByPriority.js.map
