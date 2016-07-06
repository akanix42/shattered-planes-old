import VisionComponent from './VisionComponent';
import GameGenerator from '/GameGenerator';
import events from '/events';
import TestLevelGenerator from '../level-generators/TestLevelGenerator';
import Entity from 'shattered-lib/Entity';
import Tile from 'shattered-lib/Tile';

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
    it(`should move all tile from the fov to the previousFov when the visionRange is 0`, () => {
      const entity = new Entity();
      const visionComponent = new VisionComponent();
      entity.addComponent(visionComponent);
      const tile1 = new Tile();
      const tile2 = new Tile();
      const fov = visionComponent.fov = [tile1, tile2];

      visionComponent.updateFov();

      expect(visionComponent.fov).to.eql([]);
      expect(visionComponent._previousFov).to.equal(fov);
    });

    it(`should add all visible tiles to the field-of-view`, () => {
      const game = new GameGenerator().generate();
      const level = new TestLevelGenerator(game).generate();
      const visionComponent = new VisionComponent();

      const visionRange = 20;
      const entity = new Entity();
      entity.attributes.add('visionRange', visionRange);
      entity.addComponent(visionComponent);
      entity.tile = level.getTileAtXY(0, 0);
      const expectedFov = [];
      for (let x = Math.max(0, entity.tile.point.x); x < Math.min(level.map.width, visionRange); x++) {
        for (let y = Math.max(0, entity.tile.point.y); y < Math.min(level.map.height, visionRange); y++) {
          const tile = level.getTileAtXY(x, y);
          expectedFov.push(tile);
        }
      }

      visionComponent.updateFov();

      expect(visionComponent.fov.length).to.equal(expectedFov.length);
      // expect(visionComponent.fov).to.have.members(expectedFov);
    });

    it(`should not see tiles that are blocked by other tiles`, () => {
      throw 'not implemented';
    });


    it(`should call the shadowcaster when computing a new fov`, () => {
      const visionComponent = new VisionComponent();
      let wasCalled = false;
      visionComponent._shadowCaster.compute = ()=>wasCalled = true;

      visionComponent.entity = {
        tile: {
          point: { x: 0, y: 0 },
          map: []
        },
        attributes: {
          visionRange: { current: 2 }
        }
      };

      visionComponent.updateFov();

      expect(wasCalled).to.be.true;
    });

  });

  describe('Handlers', () => {
    it('should listen to onPosition events', () => {
      const visionComponent = new VisionComponent();
      expect(visionComponent.handlers.find(handler=>handler.eventName === events.onPosition)).to.be.ok;
    });
  });
});
