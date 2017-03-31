'use strict';
import EntityGenerator from './EntityGenerator';

import chai from 'chai';
chai.should();
const expect = chai.expect;

describe('EntityGenerator', () => {
  describe('constructor', ()=> {
    it ('should set the game property', ()=> {
      const game = {};
      const generator = new EntityGenerator(game);
      expect(generator._game).to.equal(game);
    });
  });

  describe('generate', ()=> {
    it('should generate an entity of the supplied type', ()=> {
      const testTemplate = {
        name: 'test',
      };
      const entityGenerator = new EntityGenerator();

      const entity = entityGenerator.generate(testTemplate);
      entity.template.should.equal(testTemplate);
    });

    it(`should add all of the template's components to the entity`, ()=> {
      const testTemplate = {
        name: 'test',
        components: ['component1', 'component2']
      };
      const addedComponents = [];
      class Entity {
        addComponent(component) {
          addedComponents.push(component);
        }
      }
      const entityGenerator = new EntityGenerator();
      entityGenerator._Entity = Entity;
      entityGenerator._componentGenerator = {generate: componentName=>({componentName})};

      entityGenerator.generate(testTemplate);
      addedComponents[0].should.eql({componentName: 'component1'});
      addedComponents[1].should.eql({componentName: 'component2'});
    });

    it(`should add all of the template's attributes to the entity`, ()=> {
      const testTemplate = {
        name: 'test',
        attributes: {attribute1: 10, attribute2: 5}
      };
     
      const entityGenerator = new EntityGenerator();

      const entity = entityGenerator.generate(testTemplate);
      expect(entity.attributes.attribute1.current).to.equal(testTemplate.attributes.attribute1);
      expect(entity.attributes.attribute2.current).to.equal(testTemplate.attributes.attribute2);
    });
  });

  describe('generateByName', ()=> {
    it('should generate an entity for the supplied template name', ()=> {
      const testTemplate = {
        name: 'test',
      };
      const entityGenerator = new EntityGenerator();
      EntityGenerator._templates[testTemplate.name] = testTemplate;

      const entity = entityGenerator.generateByName('test');
      entity.template.should.equal(testTemplate);

      delete EntityGenerator._templates[testTemplate.name];
    });
  });

});
