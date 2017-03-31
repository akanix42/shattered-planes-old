'use strict';
import chai from 'chai';
import Engine from './TimeEngine';

chai.should();

describe('TimeEngine', () => {

  describe('add', ()=> {
    it('should add the actor to the scheduler as a recurring item', () => {
      let result = {};
      const actor = {
        act(){
        }
      };
      const engine = new Engine();
      engine._scheduler = {
        add(actor){
          result = actor;
        }
      };

      engine.add(actor);

      result.should.equal(actor);
    });

  });

  describe('remove', ()=> {
    it('should remove the actor from the scheduler', () => {
      let result = {};
      const actor = {
        act(){
        }
      };
      const engine = new Engine();
      engine._scheduler = {
        remove(actor){
          result = {actor};
        }
      };

      engine.remove(actor);

      result.should.deep.equal({actor});
    });
  });

  describe('lock', ()=> {
    it('should pause the engine', () => {
      let wasCalled = false;
      const engine = new Engine();

      engine.lock();
      engine.add({
        act() {
          wasCalled = true;
        }
      });
      wasCalled.should.be.false;
    });
  });

  describe('unlock', ()=> {
    it('should cause the scheduler to run', () => {
      let wasCalled = false;
      const engine = new Engine();

      engine.add({
        act() {
          wasCalled = true;
        }
      }, false);
      engine.unlock();

      wasCalled.should.be.true;
    });

    it('should not unlock the engine if there are no actors', () => {
      let wasCalled = false;
      const engine = new Engine();

      engine.unlock();
      engine.add({
        act() {
          wasCalled = true;
        }
      }, false);

      wasCalled.should.be.false;
    });

  });

});
