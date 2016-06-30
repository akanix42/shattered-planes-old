'use strict';
import LevelGenerator from './LevelGenerator';
import EntityGenerator from './EntityGenerator';
import ROT from 'shattered-lib/lib/rot-js';

import chai from 'chai';
chai.should();
const expect = chai.expect;

describe('LevelGenerator', () => {
  describe('constructor', ()=> {
    it ('should set the game property', ()=> {
      const game = {};
      const generator = new LevelGenerator(game);
      expect(generator._game).to.equal(game);
    });
  });

  describe('generate', ()=> {
    it('should generate a level', ()=> {
      const testLevel = {};
      const generator = { theme: 'test', generate: () => testLevel};
      const levelGenerator = new LevelGenerator();
      levelGenerator.addGenerator(generator);
      
      const level = levelGenerator.generateRandom();
      level.should.equal(testLevel);
    });

  });

  describe('getRandomGenerator()', ()=> {
    it('should return a random theme', ()=> {
      ROT.RNG.setSeed(1345646);
      const generator = { theme: '1'};
      const generator2 = { theme: '2' };
      const generator3 = { theme: '3'};

      LevelGenerator._generators = {};
      const levelGenerator = new LevelGenerator();
      levelGenerator.addGenerator(generator);
      levelGenerator.addGenerator(generator2);
      levelGenerator.addGenerator(generator3);
      let randomGenerator = levelGenerator.getRandomGenerator();
      randomGenerator.should.equal(generator);
      randomGenerator = levelGenerator.getRandomGenerator();
      randomGenerator.should.equal(generator);
      randomGenerator = levelGenerator.getRandomGenerator();
      randomGenerator.should.equal(generator3);
    });
  });

});
