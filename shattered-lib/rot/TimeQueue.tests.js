'use strict';
import chai from 'chai';
import TimeQueue from './TimeQueue';
import postal from '/lib/postal';

const expect = chai.expect;

describe('TimeQueue', () => {

  describe('constructor', ()=> {
    it('should set the default time per turn to 1000', () => {
      const queue = new TimeQueue();
      expect(queue.timePerTurn).to.equal(1000);
    });

  });

  describe('get turn', ()=> {
    it('should return the current turn, rounded down', () => {
      const queue = new TimeQueue();
      queue._turn = 0.9;
      expect(queue.turn).to.equal(0);
      queue._turn = 1;
      expect(queue.turn).to.equal(1);
    });
  });

  describe('add', ()=> {
    it('should add the item to the queue', () => {
      const queue = new TimeQueue();
      expect(queue._queue.array.length).to.equal(0);
      queue.add({});
      expect(queue._queue.array.length).to.equal(1);
    });

    it('should add items to the queue in order by time', () => {
      const queue = new TimeQueue();
      const item1 = {};
      const item2 = {};
      queue.add(item1, 150);
      queue.add(item2, 50);
      expect(queue._queue.array[0].item).to.equal(item2);
      expect(queue._queue.array[1].item).to.equal(item1);
    });
  });

  describe('get', ()=> {
    it('should return null if there are no items in the queue', () => {
      const queue = new TimeQueue();
      expect(queue.get()).to.be.null;
    });

    it('should return the next item in the queue', () => {
      const queue = new TimeQueue();
      const item1 = {};
      const item2 = {};
      queue.add(item1, 150);
      queue.add(item2, 50);
      expect(queue.get()).to.equal(item2);
      expect(queue.get()).to.equal(item1);
    });

    it('should add the removed item to the free elements queue', () => {
      const queue = new TimeQueue();
      const item1 = {};
      queue.add(item1, 150);
      queue.get();
      expect(queue._freeElements[0].item).to.equal(item1);
    });

    it(`should advance the game time by the item's time`, ()=> {
      const queue = new TimeQueue();
      const item1 = {};
      queue.add(item1, 150);

      expect(queue.time).to.equal(0);
      queue.get();
      expect(queue.time).to.equal(150);
    });

    it(`should publish an update when the turn is incremented`, ()=> {
      const queue = new TimeQueue();
      const item1 = {};
      queue.add(item1, 100);
      queue.add(item1, 1000);

      let result;
      postal.subscribe({
        channel: 'ui',
        topic: 'turn.update',
        callback: (turn) => {
          result = turn
        }
      });
      queue.get();
      expect(result).to.be.undefined;
      queue.get();
      expect(result.turn).to.equal(1);
    });
  });

  describe('remove', ()=> {
    it('should remove the item from the queue', () => {
      const queue = new TimeQueue();
      const item1 = {};
      queue._queue.array.push(item1);

      queue.remove();
      expect(queue._queue.array.length).to.equal(1);

      queue.remove(item1);
      expect(queue._queue.array.length).to.equal(0);
    });
  });

  describe('clear', ()=> {
    it('should empty the queue', () => {
      const queue = new TimeQueue();
      queue._queue.array.push('a');
      queue.clear();
      expect(queue._queue.array.length).to.equal(0);
    });

    it('should add all of the queued items to the cache', () => {
      const queue = new TimeQueue();
      queue._queue.array.push('a');
      expect(queue._freeElements.length).to.equal(0);
      queue.clear();
      expect(queue._freeElements.length).to.equal(1);
    });
  });

});
