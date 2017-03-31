import TestAutomatedActorComponent from './TestAutomatedActorComponent';
import events from '/eventTypes';
import GameGenerator from '/GameGenerator';
import TestLevelGenerator from '/level-generators/TestLevelGenerator';
import Tile from 'shattered-lib/Tile';

import chai from 'chai';
const expect = chai.expect;

describe('TestAutomatedActorComponent', ()=> {
  describe('act', () => {
    it('should output a move event', (done) => {
      const game = new GameGenerator().generate();
      const level = new TestLevelGenerator(game).generate();
      const testAutomatedActorComponent = new TestAutomatedActorComponent(game, 1000);
      const entity = game.entityGenerator.generate({});
      entity.attributes.add('moveSpeed', 1);
      entity.addComponent(testAutomatedActorComponent);
      entity.tile = level.getTileAtXY(0, 0);
      entity.emit = (event) => {
        expect(event.type).to.equal(events.move);
        expect(event.data.destination).to.be.an.instanceOf(Tile);
        done();
      };
      testAutomatedActorComponent.init();
      testAutomatedActorComponent.act();
    });
  });
});
