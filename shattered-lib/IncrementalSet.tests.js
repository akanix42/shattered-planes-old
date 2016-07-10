'use strict';
import chai from 'chai';
import IncrementalSet from './IncrementalSet.js';

chai.should();

describe('IncrementalSet', () => {
  describe('add', ()=> {

    it('should add a value to the set', ()=> {
      const set = new IncrementalSet();
      set.add('test');
    });

    it('should allow adding a value multiple times', ()=> {
      const set = new IncrementalSet();
      set.add('test');
      set.add('test');
    });

  });

  describe('has', ()=> {

    it('should return false if the value has not been added to the set', ()=> {
      const set = new IncrementalSet();
      set.has('test').should.be.false;
    });

    it('should return true if the value has been added to the set', ()=> {
      const set = new IncrementalSet();
      set.add('test');
      set.has('test').should.be.true;
    });

  });

  describe('delete', ()=> {
    
    it('should remove a value from the set', ()=> {
      const set = new IncrementalSet();
      set.add('test');
      set.delete('test');
      set.has('test').should.be.false;
    });

    it('should only remove one "instance" of a value from the set each time it is called', ()=> {
      const set = new IncrementalSet();
      set.add('test');
      set.add('test');
      set.delete('test');
      set.has('test').should.be.true;
      set.delete('test');
      set.has('test').should.be.false;
    });

  });

});