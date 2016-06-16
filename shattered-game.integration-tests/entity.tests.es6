'use strict';
import GameGenerator from 'shattered-game/GameGenerator';
import Entity from 'shattered-lib/Entity';
import Component from 'shattered-lib/Component';
import components from 'shattered-game/components/index';
import global from 'shattered-game/global';
import events from 'shattered-game/events';

import chai from 'chai';
const expect = chai.expect;

class TestDrivenActorComponent extends Component {
  onAct = null;

  constructor() {
    super();
    global.game.engine.add(this, false);
  }

  act() {
    this.onAct();
  }
}
TestDrivenActorComponent._name = 'testDrivenActor';

describe('moving entity', ()=> {
  it('should create an entity and cause it to act', () => {
    const gameGenerator = new GameGenerator();
    const game = gameGenerator.generate({numberOfLevels: 1});

    const entity = new Entity();
    const testDrivenActor = new TestDrivenActorComponent();
    let wasCalled = false;
    testDrivenActor.onAct = ()=>wasCalled = true;

    entity
      .addComponent(new components.normalMovement())
      .addComponent(new components.occupant())
      .addComponent(testDrivenActor);

    game.levels[1].getTileAt({x: 0, y: 0}).addOccupant(entity);
    game.start();

    expect(wasCalled).to.be.true;
  });

  it('should create an entity and move it around the map', (done) => {
    const gameGenerator = new GameGenerator();
    const game = gameGenerator.generate({numberOfLevels: 1});

    const entity = new Entity();
    const testDrivenActor = new TestDrivenActorComponent();

    class AfterMoveComponent extends Component {
      constructor() {
        super();
        this.addHandler(events.move, 150, this.onMove);
      }

      onMove() {
        expect(this.entity.tile.point).to.eql({x:1, y:0});
        done();
      }
    }
    testDrivenActor.onAct = function () {
      const tile = testDrivenActor.entity.tile;
      var event = {name: events.move, destination: tile.level.getTileAt({x: tile.point.x + 1, y: tile.point.y})};
      testDrivenActor.entity.emit(event);
    };

    entity.attributes.add('moveSpeed', 1);
    entity
      .addComponent(new components.normalMovement())
      .addComponent(new components.occupant())
      .addComponent(new AfterMoveComponent())
      .addComponent(testDrivenActor);

    game.levels[1].getTileAt({x: 0, y: 0}).addOccupant(entity);
    game.start();


  });
});
