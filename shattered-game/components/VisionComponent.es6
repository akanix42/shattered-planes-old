'use strict';
import {serializable, Deserializer} from 'jsonc';
import Component from 'shattered-lib/Component';
import events from '/events';
import postal from 'postal';

@serializable('VisionComponent')
class VisionComponent extends Component {
  fov = null;

  constructor() {
    super();
    this.addHandler(events.onPosition, 150, this.onPositionChanged);
  }

  init() {
    this.entity.attributes.add('visionRange', 0);
  }

  [Deserializer.Symbols.PostProcess]() {
    this.updateFov();
  }

  onPositionChanged() {
    this.updateFov();
  }

  updateFov() {
    const visionRange = 20;
    const fov = [];
    const level = this.entity.tile.level;
    const onEntityAddedHandler = {
      eventName: events.onEntityAdded,
      priority: 150,
      component: this,
      callback: this.onEntityAdded
    };
    const onEntityRemovedHandler = {
      eventName: events.onEntityRemoved,
      priority: 150,
      component: this,
      callback: this.onEntityAdded
    };
    for (let x = Math.max(0, this.entity.tile.point.x); x < Math.min(level.map.length, visionRange); x++) {
      for (let y = Math.max(0, this.entity.tile.point.y); y < Math.min(level.map.length, visionRange); y++) {
        const tile = level.getTileAtXY(x, y);
        if (tile != this.entity.tile) {
          tile._handlers.add(onEntityAddedHandler);
          tile._handlers.add(onEntityRemovedHandler);
        }
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
