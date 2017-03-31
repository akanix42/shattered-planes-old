import TargetTileActorComponent from './TargetTileActorComponent';
import events from '/eventTypes';

import chai from 'chai';
const expect = chai.expect;

describe('TargetTileActorComponent', ()=> {
  describe('constructor', () => {
    it('should record the passed in options', () => {
      const options = {};
      const component = new TargetTileActorComponent({}, options);

      expect(component.options).to.equal(options);
    });
  });

  describe('init', () => {
    it('should set the targetTile using the X and Y options', () => {
      const options = { x: 5, y: 5 };
      const targetTile = { point: { x: 5, y: 5 } };
      const entity = {
        tile: {
          point: { x: 0, y: 0 },
          level: {
            getTileAtXY(x, y) {
              if (x === options.x && y === options.y)
                return targetTile;
              return { point: { x, y } };
            }
          }
        }
      };
      const component = new TargetTileActorComponent({}, options);
      component.entity = entity;

      component.init();

      expect(component.targetTile).to.equal(targetTile);
    });

    it('should calculate the path from the source to the target', () => {
      const options = { x: 3, y: 3 };
      const level = {};
      level.getTileAtXY = (x, y) =>({ point: { x, y }, level });

      const entity = {
        tile: level.getTileAtXY(0, 0)
      };
      const component = new TargetTileActorComponent({}, options);
      component.entity = entity;

      component.init();

      expect(component.path).to.eql([
        level.getTileAtXY(1, 1),
        level.getTileAtXY(2, 2),
        level.getTileAtXY(3, 3),
      ]);
    });

  });

  describe('act', () => {
    it('should do nothing except return the moveTime if already at the target', () => {
      const options = { moveTime: 500 };
      const component = new TargetTileActorComponent({}, options);
      const targetTile = {};
      component.entity = { tile: targetTile };
      component.targetTile = targetTile;
      component.path = [{}];

      const moveTime = component.act();

      expect(moveTime).to.equal(options.moveTime);
      expect(component.path.length).to.equal(1);
    });

    it('should emit a position event for the next tile in the path', () => {
      const options = { moveTime: 500 };
      const component = new TargetTileActorComponent({}, options);
      const nextTile = {};
      let result;
      component.entity = {
        tile: {},
        emit(event){
          result = event;
        }
      };
      component.path = [nextTile, {}];

      component.act();

      expect(result.type).to.equal(events.onPosition);
      expect(result.data.destination).to.equal(nextTile);
    });

    it('should return the moveTime', () => {
      const options = { moveTime: 500 };
      const component = new TargetTileActorComponent({}, options);
      component.entity = { tile: {}, emit: ()=>{} };
      component.path = [{}];

      const moveTime = component.act();

      expect(moveTime).to.equal(options.moveTime);
    });
  });
});
