import UIVisionComponent from './UIVisionComponent';
import events from '/eventTypes';
import Tile from 'shattered-lib/Tile';
import { Deserializer } from 'shattered-lib/lib/jsonc';
import { postal } from '/global';

import chai from 'chai';
const expect = chai.expect;

describe('UIVisionComponent', ()=> {

  describe('deserialization', () => {
    it(`should publish an fov reset`, () => {
      let wasCalled = false;
      const subscription = postal.subscribe({
        topic: 'ui.vision.reset',
        callback: ()=>wasCalled = true
      });

      new UIVisionComponent()[Deserializer.Symbols.PostProcess]();
      expect(wasCalled).to.be.true;

      subscription.unsubscribe();
    });
  });

  describe('updateFov', () => {

    it('should notify the ui of the fov changes', ()=> {
      const visionComponent = new UIVisionComponent();
      const proto = visionComponent.__proto__.__proto__;
      visionComponent.__proto__.__proto__ = {
        ...visionComponent.__proto__.__proto__, updateFov: ()=> {
        }
      };
      const newlyVisibleTile = new Tile();
      const alreadyVisibleTile = new Tile();
      const noLongerVisibleTile = new Tile();
      visionComponent._previousFov = [alreadyVisibleTile, noLongerVisibleTile];
      visionComponent.fov = [newlyVisibleTile, alreadyVisibleTile];
      let wasCalled = false;
      const subscription = postal.subscribe({
        topic: 'ui.vision.reset',
        callback: (data)=> {
          wasCalled = true;
          expect(data.fov[0]).to.equal(newlyVisibleTile);
          expect(data.fov.length).to.equal(1);
          expect(data.removedTiles[0]).to.equal(noLongerVisibleTile);
          expect(data.removedTiles.length).to.equal(1);
        }
      });

      visionComponent.updateFov();
      expect(wasCalled).to.be.true;

      subscription.unsubscribe();
      visionComponent.__proto__.__proto__ = proto;
    });

    it('should subscribe to all tiles in the field-of-view', () => {
      const visionComponent = new UIVisionComponent();
      const proto = visionComponent.__proto__.__proto__;
      visionComponent.__proto__.__proto__ = {
        ...visionComponent.__proto__.__proto__, updateFov: ()=> {
        }
      };
      const newlyVisibleTile1 = new Tile();
      const newlyVisibleTile2 = new Tile();
      visionComponent.fov = [newlyVisibleTile1, newlyVisibleTile2];

      visionComponent.updateFov();

      let evt = events.onEntityAdded;
      const shouldBeAVisionComponentHandler = handler=> handler.context === visionComponent;
      const hasTileHandlers = tile=> {
        const result = tile._handlers._handlersByPriority[visionComponent._onEntityAddedHandler.priority][events.onEntityAdded.id].some(shouldBeAVisionComponentHandler)
          && tile._handlers._handlersByPriority[visionComponent._onEntityAddedHandler.priority][events.onEntityRemoved.id].some(shouldBeAVisionComponentHandler);
        return result;
      };

      try {
        expect(visionComponent.fov.every(hasTileHandlers)).to.be.true;
      } finally {
        visionComponent.__proto__.__proto__ = proto;
      }
    });

    it(`should unsubscribe from tiles that are no longer in the field-of-view`, () => {
      const visionComponent = new UIVisionComponent();
      const proto = visionComponent.__proto__.__proto__;
      visionComponent.__proto__.__proto__ = {
        ...visionComponent.__proto__.__proto__, updateFov: ()=> {
        }
      };
      const newlyVisibleTile = new Tile();
      const alreadyVisibleTile = new Tile();
      const noLongerVisibleTile = new Tile();
      visionComponent._previousFov = [alreadyVisibleTile, noLongerVisibleTile];
      visionComponent.fov = [newlyVisibleTile, alreadyVisibleTile];

      noLongerVisibleTile._handlers.add({
        id: visionComponent._onEntityAddedHandler.id,
        eventType: events.onEntityAdded, callback: ()=> {
        }, component: visionComponent, priority: visionComponent._onEntityAddedHandler.priority
      });
      noLongerVisibleTile._handlers.add({
        id: visionComponent._onEntityRemovedHandler.id,
        eventType: events.onEntityRemoved, callback: ()=> {
        }, component: visionComponent, priority: visionComponent._onEntityRemovedHandler.priority
      });
      expect(noLongerVisibleTile._handlers._handlersByPriority[visionComponent._onEntityAddedHandler.priority][events.onEntityAdded.id].length).to.equal(1);
      expect(noLongerVisibleTile._handlers._handlersByPriority[visionComponent._onEntityRemovedHandler.priority][events.onEntityRemoved.id].length).to.equal(1);

      visionComponent.updateFov();

      expect(noLongerVisibleTile._handlers._handlersByPriority[visionComponent._onEntityAddedHandler.priority][events.onEntityAdded.id].length).to.equal(0);
      expect(noLongerVisibleTile._handlers._handlersByPriority[visionComponent._onEntityRemovedHandler.priority][events.onEntityRemoved.id].length).to.equal(0);

      visionComponent.__proto__.__proto__ = proto;
    });

  });

  describe('onEntityAdded', () => {
    it('should publish a tile update', ()=> {
      const visionComponent = new UIVisionComponent();
      const tile = {};
      let wasCalled = false;
      const subscription = postal.subscribe({
        topic: 'ui.vision.update',
        callback: (data)=> {
          wasCalled = true;
          expect(data.tile).to.equal(tile);
        }
      });

      visionComponent.onEntityAdded({ data: { tile } });

      subscription.unsubscribe();
      expect(wasCalled).to.be.true;
    });
  });

  describe('onEntityRemoved', () => {
    it('should notify the ui of the changed tiles', ()=> {
      const visionComponent = new UIVisionComponent();
      const tile = {};
      let wasCalled = false;
      const subscription = postal.subscribe({
        topic: 'ui.vision.update',
        callback: (data)=> {
          wasCalled = true;
          expect(data.tile).to.equal(tile);
        }
      });

      visionComponent.onEntityRemoved({ data: { tile } });

      subscription.unsubscribe();
      expect(wasCalled).to.be.true;
    });
  });
});
