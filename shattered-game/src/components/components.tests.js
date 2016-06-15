import components from './index';
import chai from 'chai';

const expect = chai.expect;

describe('components', ()=> {
  const keys = Object.keys(components);
  keys.forEach(key=> {
    describe(key, ()=> {
      it('should be serializable', ()=> {
        const component = components[key];
        console.log(key);
        expect(component.__type__).to.be.ok;
      });

      it('should have a name', ()=> {
        const component = components[key];
        console.log(key);
        expect(component._name).to.be.ok;
      });
    });
  });
});

