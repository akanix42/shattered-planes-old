import VisionComponent from './VisionComponent';
import events from '/events';
import TestLevelGenerator from '../level-generators/TestLevelGenerator';
import Entity from 'shattered-lib/Entity';

import chai from 'chai';
const expect = chai.expect;

describe('VisionComponent', ()=> {
  describe('init', () => {
    it(`should set a default visionRange of zero`, () => {
      const entity = new Entity();
      const visionComponent = new VisionComponent();
      visionComponent.entity = entity;
      visionComponent.init();
      expect(entity.attributes.visionRange.current).to.equal(0);
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
      const entity = new Entity();
      const visionComponent = new VisionComponent();
      entity.addComponent(visionComponent);
      visionComponent.updateFov();
      expect(visionComponent.fov).to.eql([]);
    });

    it(`should update the previous fov`, () => {
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

    it(`should not see tiles that are blocked by other tiles`, () => {
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
