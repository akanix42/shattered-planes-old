'use strict';
import GameGenerator from 'shattered-game/GameGenerator';
import Entity from 'shattered-lib/Entity';
import Component from 'shattered-lib/Component';
import components from 'shattered-game/components/index';
import global from 'shattered-game/global';
import events from 'shattered-game/events';

import chai from 'chai';
const expect = chai.expect;

let nextComponentId = 1;
class TestDrivenActorComponent extends Component {
  onAct = null;
  id = nextComponentId++;

  constructor() {
    super();
    global.game.engine.add(this);
  }

  act() {
    return this.onAct();
  }
}
TestDrivenActorComponent._name = 'testDrivenActor';

describe('acting entites', ()=> {
  it('should act', () => {
    const gameGenerator = new GameGenerator();
    const game = gameGenerator.generate({numberOfLevels: 1});

    const entity = new Entity();
    const testDrivenActor = new TestDrivenActorComponent();
    let wasCalled = false;
    testDrivenActor.onAct = ()=> {
      wasCalled = true;
      game.engine.lock();
    };

    entity
      .addComponent(testDrivenActor);

    game.start();

    expect(wasCalled).to.be.true;
  });

  it('should call multiple entities in order by action duration', () => {
    const gameGenerator = new GameGenerator();
    const game = gameGenerator.generate({numberOfLevels: 1});

    const actor1 = new TestDrivenActorComponent();
    const actor2 = new TestDrivenActorComponent();
    const actor3 = new TestDrivenActorComponent();
    const expectedActorOrder = [
      actor1.id,
      actor2.id,
      actor3.id,
      actor3.id,
      actor1.id,
      actor2.id,
      actor1.id,
      actor1.id,
      actor2.id,
      actor3.id
    ];
    const actor1ActionTimes = [2, 1, 1];
    const actor2ActionTimes = [2, 3];
    const actor3ActionTimes = [1, 5];

    const actualActorOrder = [];
    actor1.onAct = () => {
      actualActorOrder.push(actor1.id);
      if (!actor1ActionTimes.length)
        game.engine.remove(actor1);
      return actor1ActionTimes.shift();
    };

    actor2.onAct = () => {
      actualActorOrder.push(actor2.id);
      if (!actor2ActionTimes.length)
        game.engine.remove(actor2);
      return actor2ActionTimes.shift();
    };

    actor3.onAct = () => {
      actualActorOrder.push(actor3.id);
      if (!actor3ActionTimes.length)
        game.engine.remove(actor3);
      return actor3ActionTimes.shift();
    };

    new Entity().addComponent(actor1);
    new Entity().addComponent(actor2);
    new Entity().addComponent(actor3);

    game.start();

    expect(actualActorOrder).to.eql(expectedActorOrder);
  });
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
