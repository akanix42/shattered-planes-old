'use strict';
import chai from 'chai';
import ComponentGenerator from './ComponentGenerator';

chai.should();

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
  });

});
