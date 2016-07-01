'use strict';
import {serializable, Deserializer} from 'shattered-lib/lib/jsonc';
import VisionComponent from './VisionComponent';
import events from '/events';
import {postal} from '/global';

@serializable('UIVisionComponent', {exclude: ['_onEntityAddedHandler', '_onEntityRemovedHandler']})
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

    const newTiles = [];
    const previousFovSet = new Set(this._previousFov);
    this.fov.forEach(tile => {
      if (!previousFovSet.has(tile)) {
        tile._handlers.add(this._onEntityAddedHandler);
        tile._handlers.add(this._onEntityRemovedHandler);
        newTiles.push(tile);
      }
      else {
        /**
         * This tile is still in the fov, remove it so we will only have unused tiles left
         */
        previousFovSet.delete(tile);
      }
    });

    previousFovSet.forEach(tile=> {
      tile._handlers.remove(this._onEntityAddedHandler);
      tile._handlers.remove(this._onEntityRemovedHandler);
    });

    postal.publish({
      channel: 'ui',
      topic: 'vision.reset',
      data: {
        fov: newTiles
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
UIVisionComponent._name = 'uiVision';

export default UIVisionComponent;
