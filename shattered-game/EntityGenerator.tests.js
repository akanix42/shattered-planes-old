import EntityGenerator from './EntityGenerator';
import chai from 'chai';

chai.should();

describe('EntityGenerator', () => {
  it('should have loaded entity templates', ()=> {
    Object.keys(EntityGenerator._templates).length.should.be.ok;
  });
});
