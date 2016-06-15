'use strict';
import chai from 'chai';
import idGenerator from './idGenerator';

const expect = chai.expect;

describe('idGenerator', () => {

  describe('generate', ()=> {
    it('should generate a numeric id', ()=> {
      const id = idGenerator.generate();
      expect(id).to.be.a('number');
      expect(id % 1).to.equal(0);
    });

    it('should generate sequential numeric ids', ()=> {
      const id1 = idGenerator.generate();
      const id2 = idGenerator.generate();
      const id3 = idGenerator.generate();
      expect(id3 - id2).to.equal(1);
      expect(id2 - id1).to.equal(1);
    });

  });

  describe('reset', ()=> {
    it('should reset to 1 if no argument is passed', ()=> {
      idGenerator.reset();
      const id = idGenerator.generate();
      expect(id).to.equal(1);
    });

    it('should reset to the passed in number', ()=> {
      const resetTo = 5;
      idGenerator.reset(resetTo);
      const id = idGenerator.generate();
      expect(id).to.equal(resetTo);
    });
  })

});
