'use strict';
import chai from 'chai';
import TimeScheduler from './TimeScheduler';

const expect = chai.expect;

describe('TimeScheduler', () => {

  describe('get turn', ()=> {
    it(`should return the queue's turn count`, () => {
      const scheduler = new TimeScheduler();
      scheduler._queue = { turn: 5 };
      expect(scheduler.turn).to.equal(5);
    });
  });

  describe('get time', ()=> {
    it(`should return the queue's time count`, () => {
      const scheduler = new TimeScheduler();
      scheduler._queue = { time: 5 };
      expect(scheduler.time).to.equal(5);
    });
  });

  describe('add', ()=> {
    it('should add the item to the queue', () => {
      const scheduler = new TimeScheduler();
      let result;
      let item = {}, time = {};
      scheduler._queue = {
        add (item, time){
          result = { item, time }
        }
      };
      scheduler.add(item, time);

      expect(result.item).to.equal(item);
      expect(result.time).to.equal(time);
    });

    it('should return the scheduler for chaining', () => {
      const scheduler = new TimeScheduler();
      let result;
      scheduler._queue = {
        add (){
        }
      };
      expect(scheduler.add()).to.equal(scheduler);
    });

  });

  describe('clear', ()=> {
    it('should call clear on the underlying queue', () => {
      const scheduler = new TimeScheduler();
      let wasCalled;
      scheduler._queue = {
        clear (){
          wasCalled = true
        }
      };

      scheduler.clear();

      expect(wasCalled).to.be.true;
    });

    it('should return the scheduler for chaining', () => {
      const scheduler = new TimeScheduler();
      let result;
      scheduler._queue = {
        clear (){
        }
      };
      expect(scheduler.clear()).to.equal(scheduler);
    });

  });

  describe('remove', ()=> {
    it('should call remove on the underlying queue', () => {
      const scheduler = new TimeScheduler();
      let result;
      const item = {};
      scheduler._queue = {
        remove (item){
          result = item;
        }
      };

      scheduler.remove(item);

      expect(result).to.equal(item);
    });

  });

});
