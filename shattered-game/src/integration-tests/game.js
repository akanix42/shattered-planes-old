'use strict';
import GameGenerator from '/GameGenerator';
import Entity from 'shattered-lib/Entity';
import components from '/components/index';

class TestDrivenActorComponent {
  onAct = null;

  act() {
    this.onAct();
  }
}

describe('moving entity', ()=> {
  it('should create an entity and move it around the map', () => {
    const gameGenerator = new GameGenerator();
    const game = gameGenerator.generate({numberOfLevels: 1});
    game.start();

    const entity = new Entity();
    const testDrivenActor = new TestDrivenActorComponent();
    testDrivenActor.onAct = function () {
      console.dir(this.entity);
    };
    testDrivenActor.act();
    entity
      .addComponent(new components.NormalMovementComponent())
      .addComponent(new components.PositionComponent())
      .addComponent(testDrivenActor);
  });
});
