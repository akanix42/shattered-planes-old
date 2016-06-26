'use strict';
import {serializable} from 'jsonc';
import Component from 'shattered-lib/Component';
import global from 'shattered-game/global';
import ROT from 'rot-js';
import events from '/events';

@serializable('TestAutomatedActorComponent')
class TestAutomatedActorComponent extends Component {
  constructor() {
    super();
    global.game.engine.add(this);
  }

  act() {
    return new Promise((resolve)=> {
      setTimeout(() => {
        const tile = this.entity.tile;

        const x = ROT.RNG.getUniformInt(Math.max(0, tile.point.x - 1), Math.min(tile.level._map.length, tile.point.x + 1));
        const y = ROT.RNG.getUniformInt(Math.max(0, tile.point.y - 1), Math.min(tile.level._map.length, tile.point.y + 1));
        var event = {name: events.move, destination: tile.level.getTileAtXY(x, y)};
        this.entity.emit(event);

        resolve(event.actionTime);
      }, 5000);
    });
  }
}
TestAutomatedActorComponent._name = 'testAutomatedActor';

export default TestAutomatedActorComponent;
