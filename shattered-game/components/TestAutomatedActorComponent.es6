'use strict';
import {serializable} from 'jsonc';
import ActorComponent from './ActorComponent';
import global from '/global';
import ROT from 'rot-js';
import events from '/events';

@serializable('TestAutomatedActorComponent')
class TestAutomatedActorComponent extends ActorComponent {
  constructor(game, timeout = 0) {
    super(game);
    this._timeout = timeout;
  }

  act() {
    return new Promise((resolve)=> {
      const performAction = () => {
        const tile = this.entity.tile;

        const x = ROT.RNG.getUniformInt(Math.max(0, tile.point.x - 1), Math.min(tile.level._map.width - 1, tile.point.x + 1));
        const y = ROT.RNG.getUniformInt(Math.max(0, tile.point.y - 1), Math.min(tile.level._map.height - 1, tile.point.y + 1));
        var event = {name: events.move, destination: tile.level.getTileAtXY(x, y)};
        this.entity.emit(event);

        resolve(event.actionTime);
      };
      if (this._timeout)
        setTimeout(performAction, this._timeout);
      else
        performAction();
    });
  }
}
TestAutomatedActorComponent._name = 'testAutomatedActor';

export default TestAutomatedActorComponent;
