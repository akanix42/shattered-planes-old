'use strict';
import GameGenerator from 'shattered-game/GameGenerator';
import Entity from 'shattered-lib/Entity';
import Component from 'shattered-lib/Component';
import components from 'shattered-game/components/index';

class TestDrivenActorComponent extends Component {
  onAct = null;

  act() {
    this.onAct();
  }
}
TestDrivenActorComponent._name = 'testDrivenActor';

describe('moving entity', ()=> {
  it('should create an entity and move it around the map', (done) => {
    const gameGenerator = new GameGenerator();
    const game = gameGenerator.generate({numberOfLevels: 1});
    game.start();

    const entity = new Entity();
    const testDrivenActor = new TestDrivenActorComponent();
    testDrivenActor.onAct = function () {
      console.log('onAct');
      console.dir(this.entity);
      done();
    };
    // testDrivenActor.act();
    entity
      .addComponent(new components.normalMovement())
      .addComponent(new components.occupant())
      .addComponent(testDrivenActor);

    game.levels[1].getTileAt({x: 0, y: 0}).addOccupant(entity);
  });
});
