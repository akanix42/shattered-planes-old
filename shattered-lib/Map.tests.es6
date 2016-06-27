'use strict';
import chai from 'chai';
import Map from './Map.js';

const expect = chai.expect;

describe('Map', () => {

  describe('constructor', ()=> {
    it(`should create an array`, ()=> {
      const map = new Map();
      expect(map).to.be.an.instanceOf(Array);
    });

    it(`should set the length of the array equal to the width`, ()=> {
      const width = 5;
      const map = new Map(width);
      expect(map.length).to.equal(width);
    });

    it(`should create nested arrays`, ()=> {
      const width = 1, height = 1;
      const map = new Map(width, height);
      expect(map[0]).to.be.an.instanceOf(Array);
    });

    it(`should set the length of the nested arrays equal to the height`, ()=> {
      const width = 1, height = 2;
      const map = new Map(width, height);
      expect(map[0].length).to.equal(height);
    });

    it(`should set the width and height`, ()=> {
      const width = 5, height = 3;
      const map = new Map(width, height);
      expect(map.width).to.equal(width);
      expect(map.height).to.equal(height);
    });
  });

});
