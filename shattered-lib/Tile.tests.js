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
  });

  describe('removeOccupant()', ()=> {

    it(`should remove the occupant`, ()=> {
      const tile = new Tile();
      const occupant = new Entity();
      tile.addOccupant(occupant);
      expect(tile.occupants[0]).to.equal(occupant);
    });
  });

  describe('inventory', ()=> {

    it(`should be an instance of Inventory`, ()=> {
      const tile = new Tile();
      expect(tile.inventory).to.be.an.instanceOf(Inventory);
    });

  });
});
