import LevelGenerator from './LevelGenerator';
import chai from 'chai';

chai.should();

describe('LevelGenerator', () => {
  it('should have loaded generators', ()=> {
    Object.keys(LevelGenerator._generators).length.should.be.ok;
  });
});
