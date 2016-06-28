'use strict';
import {serializable, Deserializer} from 'jsonc';
import Component from 'shattered-lib/Component';
import events from '/events';
import postal from 'postal';
import ROT from 'rot-js';

@serializable('VisionComponent')
class VisionComponent extends Component {
  fov = null;
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

    this.fov = fov;
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

}
VisionComponent._name = 'vision';

export default VisionComponent;
