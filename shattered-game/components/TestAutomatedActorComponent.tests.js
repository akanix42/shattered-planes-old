import TestAutomatedActorComponent from './TestAutomatedActorComponent';
import events from '/events';
import GameGenerator from '/GameGenerator';
import EntityGenerator from '/EntityGenerator';
import TestLevelGenerator from '../level-generators/TestLevelGenerator';
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
      entity.addComponent(testAutomatedActorComponent);
      entity.tile = level.getTileAtXY(0, 0);
      entity.emit = (event) => {
        expect(event.name).to.equal(events.move);
        expect(event.destination).to.be.an.instanceOf(Tile);
        done();
      };
      testAutomatedActorComponent.init();
      testAutomatedActorComponent.act();
    });
  });
});
