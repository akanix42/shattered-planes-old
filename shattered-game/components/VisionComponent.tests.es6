import VisionComponent from './VisionComponent';
import events from '/events';
import TestLevelGenerator from '../level-generators/TestLevelGenerator';
import Entity from 'shattered-lib/Entity';

import chai from 'chai';
const expect = chai.expect;

describe('VisionComponent', ()=> {
  describe('onCreated', () => {
    it(`should set a default visionRange of zero`, () => {
      throw 'not implemented';
    });
  });

  describe('deserialization', () => {
    it(`should restore the vision handlers when deserialized`, () => {
      throw 'not implemented';
    });
  });

  describe('onPositionChanged', () => {
    it(`should update the field-of-view (fov)`, (done) => {
      const visionComponent = new VisionComponent();
      visionComponent.updateFov = () => done();
      visionComponent.onPositionChanged();
    });
  });

  describe('updateFov', () => {
    it(`should be empty when the visionRange is 0`, () => {
      throw 'not implemented';
    });

    it(`should unsubscribe from tiles that are no longer in view`, () => {
      throw 'not implemented';
    });

    it(`should update the previous fov`, () => {
      throw 'not implemented';
    });

    it('should notify the ui of the fov changes', ()=>{
      throw 'not implemented';
    });

    it(`should add all visible tiles to the field-of-view`, () => {
      const level = new TestLevelGenerator().generate();
      const visionComponent = new VisionComponent();
      const entity = new Entity();
      entity.addComponent(visionComponent);
      entity.tile = level.getTileAtXY(0, 0);

      const expectedFov = [];
      const visionRange = 20;
      for (let x = Math.max(0, entity.tile.point.x); x < Math.min(level.map.width, visionRange); x++) {
        for (let y = Math.max(0, entity.tile.point.y); y < Math.min(level.map.height, visionRange); y++) {
          const tile = level.getTileAtXY(x, y);
          expectedFov.push(tile);
        }
      }

      visionComponent.updateFov();

      expect(visionComponent.fov).to.deep.equal(expectedFov);
    });

    it(`should not display tiles that are blocked by other tiles`, () => {
      throw 'not implemented';
    });

    it(`should subscribe to all tiles except for the current tile in the field-of-view (fov)`, () => {
      const level = new TestLevelGenerator().generate();
      const visionComponent = new VisionComponent();
      const entity = new Entity();
      entity.addComponent(visionComponent);
      entity.tile = level.getTileAtXY(0, 0);

      visionComponent.updateFov();
      const shouldBeAVisionComponentHandler = handler=> handler.component === visionComponent;
      const checkTileHandlers = tile=> {
        if (entity.tile === tile) {
          expect(tile._handlers._handlersByEvent[events.onEntityAdded]).to.be.undefined;
          expect(tile._handlers._handlersByEvent[events.onEntityRemoved]).to.be.undefined;
          return true;
        }

        const result = tile._handlers._handlersByEvent[events.onEntityAdded].some(shouldBeAVisionComponentHandler)
          && tile._handlers._handlersByEvent[events.onEntityRemoved].some(shouldBeAVisionComponentHandler);
        return result;
      };
      expect(visionComponent.fov.every(checkTileHandlers)).to.be.true;
    });
  });

  describe('onEntityAdded', () => {
    it ('should notify the ui of the changed tiles', ()=>{
      throw 'not implemented';
    });
  });

  describe('onEntityRemoved', () => {
    it ('should notify the ui of the changed tiles', ()=>{
      throw 'not implemented';
    });
  });

  describe('Handlers', () => {
    it('should listen to onPosition events', () => {
      const visionComponent = new VisionComponent();
      expect(visionComponent.handlers.find(handler=>handler.eventName === events.onPosition)).to.be.ok;
    });
  });
});
