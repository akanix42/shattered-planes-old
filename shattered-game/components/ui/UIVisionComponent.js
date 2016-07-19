'use strict';
import { serializable, Deserializer } from 'shattered-lib/lib/jsonc';
import VisionComponent from '../VisionComponent';
import events from '/eventTypes';
import { postal } from '/global';
import Handler from 'shattered-lib/event-system/Handler';

@serializable('UIVisionComponent', { exclude: ['_onEntityAddedHandler', '_onEntityRemovedHandler'] })
class UIVisionComponent extends VisionComponent {
  _onEntityAddedHandler = new Handler(events.onEntityAdded, events.priorities.AFTER, this, this.onEntityAdded);
  _onEntityRemovedHandler = new Handler(events.onEntityRemoved, events.priorities.AFTER, this, this.onEntityRemoved);

  [Deserializer.Symbols.PostProcess]() {
    postal.publish({
      topic: 'ui.vision.reset',
      data: {
        fov: this.fov
      }
    });
  }

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
      topic: 'ui.vision.reset',
      data: {
        fov: newTiles,
        removedTiles: [...previousFovSet]
      }
    });

  }

  onEntityAdded(event) {
    postal.publish({
      topic: 'ui.vision.update',
      data: {
        tile: event.data.tile
      }
    });
  }

  onEntityRemoved(event) {
    postal.publish({
      topic: 'ui.vision.update',
      data: {
        tile: event.data.tile
      }
    });
  }
}
UIVisionComponent._name = 'uiVision';

export default UIVisionComponent;
