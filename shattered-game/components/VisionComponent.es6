'use strict';
import {serializable, Deserializer} from 'jsonc';
import Component from 'shattered-lib/Component';
import events from '/events';
import postal from 'postal';
import ROT from 'rot-js';

@serializable('VisionComponent')
class VisionComponent extends Component {
  fov = null;
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
  _shadowCaster = new ROT.FOV.PreciseShadowcasting(this._checkIfLightPasses.bind(this));

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
    const level = this.entity.tile.level;

    const fov = this._calculateFov();
    fov.forEach(tile => {
      if (tile != this.entity.tile) {
        tile._handlers.add(this._onEntityAddedHandler);
        tile._handlers.add(this._onEntityRemovedHandler);
      }
      else
        console.log('my tile')
    });

    this.fov = fov;
    postal.publish({
      channel: 'ui',
      topic: 'vision.reset',
      data: {
        fov
      }
    });
  }

  _calculateFov() {
    const fov = [];
    const map = this.entity.tile.map;
    const visionRange = this.entity.attributes.visionRange.current;
    // var clearSightDistance = visionRange * 0.667;
    if (visionRange === 0)
      return fov;

    this._shadowCaster.compute(this.entity.tile.point.x, this.entity.tile.point.y, visionRange,
      function recordVisibleTile(x, y, distance, visibility) {
        if (visibility === 0 || x < 0 || y < 0 || x >= map.width || y >= map.height)
          return;

        // if (distance > clearSightDistance)
        //   visibility = (visionRange - distance) / (visionRange - clearSightDistance);
        fov.push(map[x][y]);
      });

    return fov;
  }

  _checkIfLightPasses(x, y) {
    const map = this.entity.tile.map;
    if (x < 0 || y < 0 || x >= map.width || y >= map.height)
      return false;
    var column = map[x];
    const isBlockingLight = map[x][y].emit({name: events.isBlockingLight});
    return !isBlockingLight;
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
