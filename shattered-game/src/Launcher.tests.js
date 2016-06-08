'use strict';
import chai from 'chai';
import Launcher from './Launcher.js';

chai.should();

describe('Launcher', () => {

  describe('startNewGame', ()=> {
    it('should call the new game generator', () => {
      let wasCalled = false;
      const launcher = new Launcher();
      launcher.GameGenerator = class GameGenerator {
        generate() {
          wasCalled = true
        }
      };
      launcher.startNewGame();

      wasCalled.should.be.true;
    });

  });

  describe('loadSavedGame', ()=> {
    it('should call the saved game loader with the game id', () => {
      let wasCalledWithGameId = false;
      let gameId = 1234;
      const launcher = new Launcher();
      launcher.GameLoader = class GameLoader {
        load(passedIngameId) {
          wasCalledWithGameId = passedIngameId === gameId
        }
      };
      launcher.loadSavedGame(gameId);

      wasCalledWithGameId.should.be.true;
    });

  });

});
