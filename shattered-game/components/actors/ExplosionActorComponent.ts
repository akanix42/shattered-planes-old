'use strict';
import ActorComponent from './ActorComponent';
import { serializable } from 'shattered-lib/lib/jsonc';
import TransientComponent from '../positioning/TransientComponent';

@serializable('ExplosionActorComponent')
export default class ExplosionActorComponent extends ActorComponent {
  isRepeating = false;

  constructor(game, options = {}) {
    super(game);

    this.options = options;
  }

  act() {
    const tile = this.entity.tile;
    const x1 = tile.point.x - 1;
    const y1 = tile.point.y - 1;
    const x2 = tile.point.x + 1;
    const y2 = tile.point.y + 1;
    const level = tile.level;

    for (let x = x1; x <= x2; x++) {
      this._generateComponent(level.getTileAtXY(x, y1));
      this._generateComponent(level.getTileAtXY(x, y2));
    }

    for (let y = y1 + 1; y < y2; y++) {
      this._generateComponent(level.getTileAtXY(x1, y));
      this._generateComponent(level.getTileAtXY(x2, y));
    }

  }

  _generateComponent(tile) {
    let template = { ...this.options };
    template.components.push([TransientComponent, { tile }]);
    this.game.entityGenerator.generate(template);
  }

}

ExplosionActorComponent._name = 'explosionActor';
