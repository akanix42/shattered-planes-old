'use strict';
import {serializable, Deserializer} from 'jsonc';
import VisionComponent from './VisionComponent';
import events from '/events';
import postal from 'postal';
import ROT from 'rot-js';

@serializable('UIVisionComponent')
class UIVisionComponent extends VisionComponent {
  _onEntityAddedHandler = {
    eventName: events.onEntityAdded,
    priority: 150,
    component: this,
    callback: this.onEntityAdded
  };
  _onEntityRemovedHandler = {
    eventName: events.onEntityRemoved,
    priority: 150,
    component: this,
    callback: this.onEntityAdded
  };

  updateFov() {
    super.updateFov();
    postal.publish({
      channel: 'ui',
      topic: 'vision.reset',
      data: {
        fov: this.fov
      }
    });
    this.fov.forEach(tile => {
      if (tile != this.entity.tile) {
        tile._handlers.add(this._onEntityAddedHandler);
        tile._handlers.add(this._onEntityRemovedHandler);
      }
      else
        console.log('my tile')
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
UIVisionComponent._name = 'uiVision';

export default UIVisionComponent;
