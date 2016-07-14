'use strict';
import { serializable, Deserializer } from 'shattered-lib/lib/jsonc';
import Component from 'shattered-lib/Component';
import events from '/eventTypes';
import Event from 'shattered-lib/event-system/Event';
import ROT from 'shattered-lib/lib/rot-js';

@serializable('VisionComponent', { exclude: ['_shadowCaster'] })
class VisionComponent extends Component {
  fov = [];
  _previousFov = [];
  _shadowCaster = new ROT.FOV.PreciseShadowcasting(this._checkIfLightPasses.bind(this));

  constructor(game) {
    super(game);
    this.addHandler(events.onPosition, events.priorities.AFTER, this.onPositionChanged);
  }

  init() {
    this.entity.attributes.add('visionRange', 0);
  }

  onPositionChanged() {
    this.updateFov();
  }

  updateFov() {
    const visionRange = this.entity.attributes.visionRange.current;

    if (visionRange === 0) {
      this._previousFov = this.fov;
      this.fov = [];
      return;
    }

    const cachedFov = this.entity.tile.fovCache;
    if (cachedFov && cachedFov.visionRange >= visionRange)
      return cachedFov[Math.min(cachedFov.length - 1, visionRange)];

    const { fov, tileFovCache } = this._calculateFov(visionRange);

    this._previousFov = this.fov;
    this.fov = fov;
    this.entity.tile.fovCache = tileFovCache;
  }

  _calculateFov(visionRange) {
    const fov = [];
    const tileFovCache = [];
    const fovAtRadius = [];
    const map = this.entity.tile.map;
    // var clearSightDistance = visionRange * 0.667;
    tileFovCache.visionRange = visionRange || 0;

    if (visionRange === 0)
      return { fov, tileFovCache };

    this._shadowCaster.compute(this.entity.tile.point.x, this.entity.tile.point.y, visionRange,
      function recordVisibleTile(x, y, distance, visibility) {
        if (visibility === 0 || x < 0 || y < 0 || x >= map.width || y >= map.height)
          return;
        const ring = fovAtRadius[distance] || (fovAtRadius[distance] = []);
        const tile = map[x][y];
        ring.push(tile);
        // if (distance > clearSightDistance)
        //   visibility = (visionRange - distance) / (visionRange - clearSightDistance);
        fov.push(tile);
      });

    let previousFov = [];
    for (var i = 0; i < fovAtRadius.length; i++)
      previousFov = tileFovCache[i] = fovAtRadius.concat(previousFov);
    return { fov, tileFovCache };
  }

  _checkIfLightPasses(x, y) {
    const map = this.entity.tile.map;
    if (x < 0 || y < 0 || x >= map.width || y >= map.height)
      return false;
    const event = new Event(events.isBlockingLight);
    const isBlockingLight = map[x][y].emit(event).isCanceled === true;

    return !isBlockingLight;
  }

}
VisionComponent._name = 'vision';

export default VisionComponent;
