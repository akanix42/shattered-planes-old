import UIVisionComponent from './UIVisionComponent';
import events from '/events';
import TestLevelGenerator from '../level-generators/TestLevelGenerator';
import Entity from 'shattered-lib/Entity';
import GameGenerator from '/GameGenerator';
import EntityGenerator from '/EntityGenerator';
import components from '/components/index';
import { Deserializer } from 'shattered-lib/lib/jsonc';
import { postal } from '/global';

import chai from 'chai';
const expect = chai.expect;

describe('UIVisionComponent', ()=> {

  describe('deserialization', () => {
    it(`should publish an fov reset`, () => {
      let wasCalled = false;
      const subscription = postal.subscribe({
        channel: 'ui',
        topic: 'vision.reset',
        callback: ()=>wasCalled = true
      });

      new UIVisionComponent()[Deserializer.Symbols.PostProcess]();
      expect(wasCalled).to.be.true;

      subscription.unsubscribe();
    });
  });

  describe('updateFov', () => {

    it(`should unsubscribe from tiles that are no longer in view`, () => {
      const game = new GameGenerator().generate({ numberOfLevels: 0 });
      const level = new TestLevelGenerator(game).generate({ numberOfCreatures: 0 });
      const entity = new Entity();
      const visionComponent = new UIVisionComponent();
      entity.tile = level.getTileAtXY(0, 0);
      entity.attributes.add('visionRange', 1);
      entity.addComponent(visionComponent);
      visionComponent.updateFov();
      entity.attributes.visionRange.base = 0;

      let wasCalled = false;
      postal.subscribe({
        channel: 'ui',
        topic: 'vision.reset',
        callback(data) {
          expect(data.removedTiles.length).to.be.greaterThan(0);
          data.removedTiles.forEach(tile=> {
            expect(tile._handlers._handlersByEvent[events.onEntityAdded].length).to.equal(0);
            expect(tile._handlers._handlersByEvent[events.onEntityRemoved].length).to.equal(0);
          });
          wasCalled = true;
        }
      });
      visionComponent.updateFov();

      expect(wasCalled).to.be.true;
    });

    it('should notify the ui of the fov changes', ()=> {
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
    it('should notify the ui of the changed tiles', ()=> {
      throw 'not implemented';
    });
  });

  describe('onEntityRemoved', () => {
    it('should notify the ui of the changed tiles', ()=> {
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
