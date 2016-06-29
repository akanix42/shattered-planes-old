import TestAutomatedActorComponent from './TestAutomatedActorComponent';
import events from '/events';
import TestLevelGenerator from '../level-generators/TestLevelGenerator';
import Entity from 'shattered-lib/Entity';
import Tile from 'shattered-lib/Tile';

import chai from 'chai';
const expect = chai.expect;

describe('TestAutomatedActorComponent', ()=> {
  describe('act', () => {
    it('should output a move event', (done) => {
      const level = new TestLevelGenerator().generate();
      const testAutomatedActorComponent = new TestAutomatedActorComponent(1000);
      const entity = new Entity();
      entity.addComponent(testAutomatedActorComponent);
      entity.tile = level.getTileAtXY(0, 0);
      entity.emit = (event) => {
        expect(event.name).to.equal(events.move);
        expect(event.destination).to.be.an.instanceOf(Tile);
        done();
      };
      testAutomatedActorComponent.act();
    });
  });
});
