'use strict';
import Entity from 'Entity';
import Event from 'event-system/Event';

interface EntityAndPriority {
  entity: Entity;
  priority: number;
}

class EntitiesByPriority {
  _entitiesByPriority: EntityAndPriority[] = [];
  _entities = new Set();

  add(entity: Entity, priority: number) {
    if (this._entities.has(entity))
      return;
    this._entitiesByPriority.push({entity, priority});
    this._entitiesByPriority.sort((entityA, entityB) => entityA.priority - entityB.priority);
    this._entities.add(entity);
  }

  emit(event: Event) {
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

  remove(entity: Entity) {
    if (!this._entities.has(entity))
      return;
    this._entitiesByPriority.splice(this._entitiesByPriority.findIndex(entry => entry.entity === entity), 1);
    this._entities.delete(entity);
  }
}

export default EntitiesByPriority;
