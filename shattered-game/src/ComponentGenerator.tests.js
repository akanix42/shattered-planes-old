import ComponentGenerator from './ComponentGenerator';
import chai from 'chai';

chai.should();

describe('ComponentGenerator', () => {
  it('should have loaded generators', ()=> {
    Object.keys(ComponentGenerator._components).length.should.be.ok;
  });
});
