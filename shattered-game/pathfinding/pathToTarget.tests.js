import { getPathToTarget } from './pathToTarget';
import events from '/eventTypes';
import Entity from 'shattered-lib/Entity';

import chai from 'chai';
const expect = chai.expect;

describe('pathToTarget', ()=> {
  describe('getPathToTarget', () => {
    it('should compute the path to the destination', () => {
      const level = {
        getTileAtXY(x, y) {
          return { point: { x, y } }
        }
      };
      const source = { point: { x: 0, y: 0 }, level };
      const target = { point: { x: 3, y: 3 } };
      const path = getPathToTarget(source, target);

      expect(path).to.eql([
        level.getTileAtXY(1,1),
        level.getTileAtXY(2,2),
        level.getTileAtXY(3,3),
      ]);
    });
  });
});
