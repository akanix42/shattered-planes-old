'use strict';

class EntitiesByPriority {
  _entitiesByPriority = [];
  _entities = new Set();

  add(entity, priority) {
    if (this._entities.has(entity))
      return;
    this._entitiesByPriority.push({entity, priority});
    this._entitiesByPriority.sort((entityA, entityB) => entityA.priority - entityB.priority);
    this._entities.add(entity);
  }

  emit(event) {
    for (let entityIndex = 0; entityIndex < this._entitiesByPriority.length; entityIndex++) {
      let entityEntry = this._entitiesByPriority[entityIndex];
      let result = entityEntry.entity.emit(event);
      if (result === false)
        break;
      else
        event = result || event;
    }
    return event;
  }

  remove(entity) {
    if (!this._entities.has(entity))
      return;
    this._entitiesByPriority.splice(this._entitiesByPriority.findIndex(entry=>entry.entity === entity), 1);
    this._entities.delete(entity);
  }
}

export default EntitiesByPriority;
