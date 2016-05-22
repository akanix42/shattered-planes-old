'use strict';
import chai from 'chai';
import LevelGenerator from './LevelGenerator';
import EntityGenerator from './EntityGenerator';
import ROT from 'rot-js';

chai.should();

describe('LevelGenerator', () => {

  describe('generate', ()=> {
    it('should generate a level', ()=> {
      const testLevel = {};
      const generator = { theme: 'test', generate: () => testLevel};
      const levelGenerator = new LevelGenerator();
      levelGenerator.addGenerator(generator);
      
      const level = levelGenerator.generateRandom();
      level.should.equal(testLevel);
    });

    it(`should add all of the template's components to the entity`, ()=> {
      const testTemplate = {
        name: 'test',
        components: ['component1', 'component2']
      };
      const addedComponents = [];
      class Entity{
        addComponent(component) {
          addedComponents.push(component);
        }
      }
      const entityGenerator = new EntityGenerator();
      entityGenerator._Entity = Entity;
      entityGenerator._templates[testTemplate.name] = testTemplate;
      entityGenerator._componentGenerator = { generate: componentName=>({componentName})};

      entityGenerator.generate('test');
      addedComponents[0].should.eql({componentName:'component1'});
      addedComponents[1].should.eql({componentName:'component2'});
    });
  });

  describe('getRandomGenerator()', ()=> {
    it('should return a random theme', ()=> {
      ROT.RNG.setSeed(1345646);
      const generator = { theme: '1'};
      const generator2 = { theme: '2' };
      const generator3 = { theme: '3'};

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
