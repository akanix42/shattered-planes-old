'use strict';
import Tile from './Tile.js';
import Inventory from './Inventory';
import Entity from './Entity.js';

import chai from 'chai';
chai.should();
const expect = chai.expect;

describe('Tile', () => {

  describe('point', ()=> {
    it('should return the tile`s point coordinates', ()=> {
      const point = {};
      const tile = new Tile(point, {});
      tile.point.should.equal(point);
    });
  });

  describe('level', ()=> {
    it('should return the tile`s level', ()=> {
      const level = {};
      const tile = new Tile({}, {level});
      tile.level.should.equal(level);
    });
  });

  describe('addOccupant()', ()=> {

    it(`should add the occupant`, ()=> {
      const tile = new Tile();
      const occupant = new Entity();
      tile.addOccupant(occupant);
      expect(tile.occupants[0]).to.equal(occupant);
    });

    it(`should add multiple occupants`, ()=> {
      const tile = new Tile();
      const occupant = new Entity();
      const occupant2 = new Entity();
      tile.addOccupant(occupant);
      tile.addOccupant(occupant2);
      expect(tile.occupants[0]).to.equal(occupant);
      expect(tile.occupants[1]).to.equal(occupant2);
    });

    it(`should add the occupant's handlers to the combined handlers list`, ()=> {
      const tile = new Tile();
      const occupant = new Entity();
      const handler = {eventName: 'test', callback: null, component: {}};
      occupant.subscribedHandlers.add(handler);
      tile.addOccupant(occupant);

      expect(tile._handlers._handlersByEvent['test'][0]).to.equal(handler);
    });
  });

  describe('removeOccupant()', ()=> {

    it(`should remove the occupant`, ()=> {
      const tile = new Tile();
      const occupant = new Entity();
      tile.addOccupant(occupant);
      expect(tile.occupants[0]).to.equal(occupant);
    });

    it(`should remove the occupant's handlers from the combined handlers list`, ()=> {
      const tile = new Tile();
      const occupant = new Entity();
      const handler = {eventName: 'test', callback: null, component: {}};
      occupant.subscribedHandlers.add(handler);
      tile.addOccupant(occupant);

      expect(tile._handlers._handlersByEvent['test'][0]).to.equal(handler);

      tile.removeOccupant(occupant);
      expect(tile._handlers._handlersByEvent['test'].length).to.equal(0);
    });
  });

  describe('architecture', ()=> {

    it(`should add the architecture's handlers to the combined handlers list`, ()=> {
      const tile = new Tile();
      let result;
      const architecture = new Entity();
      const handler = {eventName: 'test', callback: null, component: {}};
      architecture.subscribedHandlers.add(handler);
      tile.architecture = architecture;

      expect(tile._handlers._handlersByEvent['test'][0]).to.equal(handler);
    });

  });

  describe('inventory', ()=> {

    it(`should be an instance of Inventory`, ()=> {
      const tile = new Tile();
      expect(tile.inventory).to.be.an.instanceOf(Inventory);
    });

  });
});
