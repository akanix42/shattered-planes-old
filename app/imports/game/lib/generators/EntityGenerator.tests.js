'use strict';
import chai from 'chai';
import EntityGenerator from './EntityGenerator';

chai.should();

describe('EntityGenerator', () => {

  describe('generate', ()=> {
    it('should generate an entity of the supplied type', ()=> {
      const testTemplate = {
        name: 'test',
      };
      const entityGenerator = new EntityGenerator();
      entityGenerator._templates[testTemplate.name] = testTemplate;
      
      const entity = entityGenerator.generate('test');
      entity.template.should.equal(testTemplate);
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

});
