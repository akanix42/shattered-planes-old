'use strict';
import chai from 'chai';
import ComponentGenerator from './ComponentGenerator';

chai.should();
const expect = chai.expect;

describe('ComponentGenerator', () => {

  describe('generate', ()=> {
    it('should return an instance of the requested component', ()=> {
      class TestComponent {

      }
      const componentGenerator = new ComponentGenerator();
      componentGenerator._components['test'] = TestComponent;

      const component = componentGenerator.generate('test');
      component.should.be.instanceOf(TestComponent);
    });

    it('should assign a numeric id', ()=> {
      class TestComponent {

      }
      const componentGenerator = new ComponentGenerator();
      componentGenerator._components['test'] = TestComponent;

      const component = componentGenerator.generate('test');
      expect(component.id).to.be.greaterThan(0);
    });
  });

});
