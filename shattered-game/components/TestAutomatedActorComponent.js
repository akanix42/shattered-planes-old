'use strict';
import { serializable } from 'shattered-lib/lib/jsonc';
import ActorComponent from './ActorComponent';
import global from '/global';
import ROT from 'shattered-lib/lib/rot-js';
import events from '/events';

@serializable('TestAutomatedActorComponent')
class TestAutomatedActorComponent extends ActorComponent {
  constructor(game, timeout = 0) {
    super(game);
    this._timeout = timeout;
  }

  act() {
    const performAction = () => {
      const tile = this.entity.tile;

      const x = ROT.RNG.getUniformInt(Math.max(0, tile.point.x - 1), Math.min(tile.level._map.width - 1, tile.point.x + 1));
      const y = ROT.RNG.getUniformInt(Math.max(0, tile.point.y - 1), Math.min(tile.level._map.height - 1, tile.point.y + 1));
      var event = { name: events.move, destination: tile.level.getTileAtXY(x, y) };
      this.entity.emit(event);

      return event.actionTime || this.entity.attributes.moveSpeed.current;
      // resolve(event.actionTime||this.entity.attributes.moveSpeed.current);
    };
    if (this._timeout)
      return new Promise((resolve)=> {
        setTimeout(()=>resolve(performAction), this._timeout);
      });
    else
      return performAction();
  }
}
TestAutomatedActorComponent._name = 'testAutomatedActor';

export default TestAutomatedActorComponent;
