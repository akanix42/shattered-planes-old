import components from './index';
import chai from 'chai';

const expect = chai.expect;

describe('components', ()=> {
  const keys = Object.keys(components);
  keys.forEach(key=> {
    describe(key, ()=> {
      it('should be serializable', ()=> {
        const component = components[key];
        expect(component.__type__).to.be.ok;
      });

      it('should have a name', ()=> {
        const component = components[key];
        expect(component._name).to.be.ok;
      });

      describe('should accept the game as the first argument and pass it to the base Component', ()=> {
        const game = {};
        const Component = components[key];
        const component = new Component(game);
        try {
          expect(component.game).to.equal(game);
        }
        catch (err) {
          console.log('Component: ', key);
          throw err;
        }
      });

    });
  });
});

