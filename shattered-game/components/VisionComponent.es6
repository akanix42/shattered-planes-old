'use strict';
import {serializable} from 'jsonc';
import Component from 'shattered-lib/Component';
import uiObservers from '/uiObservers';
import events from '/events';
import postal from 'postal';

@serializable('VisionComponent')
class VisionComponent extends Component {
  _entity = null;
  fov = null;

  constructor() {
    super();
    // uiObservers.add(this);
    this.addHandler(events.onEntityAdded, this.onEntityAdded, 150);
    this.addHandler(events.onEntityRemoved, this.onEntityRemoved, 150);
  }

  get entity() {
    return this._entity;
  }

  set entity(entity) {
    this._entity = entity;
    this.updateFov();
  }

  updateFov() {
    const visionRange = 20;
    const fov = [];
    const level = this.entity.tile.level;
    const onEntityAddedHandler = {eventName: events.onEntityAdded, priority: 100, component: this};
    const onEntityRemovedHandler = {eventName: events.onEntityRemoved, priority: 100, component: this};
    for (let x = Math.max(0, this.entity.tile.point.x); x < Math.min(level.map.length, visionRange); x++) {
      for (let y = Math.max(0, this.entity.tile.point.y); y < Math.min(level.map.length, visionRange); y++) {
        const tile = level.getTileAt(x, y);
        tile._handlers._add(onEntityAddedHandler);
        tile._handlers._add(onEntityRemovedHandler);
        fov.push(tile);
      }
    }
    this.fov = fov;
    postal.publish({
      channel: 'ui',
      topic: 'vision.reset',
      data: {
        fov
      }
    });
  }

  onEntityAdded(event) {
    postal.publish({
      channel: 'ui',
      topic: 'vision.update',
      data: {
        tile: event.tile
      }
    });
  }

  onEntityRemoved(event) {
    postal.publish({
      channel: 'ui',
      topic: 'vision.update',
      data: {
        tile: event.tile
      }
    });
  }
}
VisionComponent._name = 'vision';

export default VisionComponent;
