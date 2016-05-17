'use strict';
import chai from 'chai';
import Level from './Level.js';

chai.should();

describe('Level', () => {

  describe('get map()', ()=> {
    it(`should return the level's map`, ()=> {
      const map = {};
      const level = new Level();
      level._map = map;
      level.map.should.equal(map);
    });
  });

  describe('set map()', ()=> {
    it(`should set the level's map`, ()=> {
      const map = {};
      const level = new Level();
      level.map = map;
      level.map.should.equal(map);
      level.map.level.should.equal(level);
    });
  });

  describe('getTileAt()', ()=> {
    it(`should get the tile at the given point`, ()=> {
      const map = {};
      const level = new Level();
      level.map = map;
      level.map.should.equal(map);
      level.map.level.should.equal(level);
    });
  });
  
});
