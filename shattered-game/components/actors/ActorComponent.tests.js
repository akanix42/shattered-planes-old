import ActorComponent from './ActorComponent';
import GameGenerator from '/GameGenerator';
import chai from 'chai';
const expect = chai.expect;

describe('ActorComponent', ()=> {
  describe('init', () => {
    it(`should add the component to the game engine`, (done) => {
      const game = new GameGenerator().generate();
      const actorComponent = new ActorComponent(game);
      actorComponent.act = () => {
        game.engine.lock();
        done();
      };
      actorComponent.init();
      game.start();
    });
  });
});
