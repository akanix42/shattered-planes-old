'use strict';
import chai from 'chai';
import Tile from './Tile.js';

chai.should();

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

  describe('addEntity()', ()=> {

    it(`should add the entity`, ()=> {
      const tile = new Tile();
      tile.addEntity({}, 0);
    });

  });

});
