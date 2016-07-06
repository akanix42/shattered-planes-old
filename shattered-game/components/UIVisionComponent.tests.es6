import UIVisionComponent from './UIVisionComponent';
import events from '/events';
import TestLevelGenerator from '../level-generators/TestLevelGenerator';
import Entity from 'shattered-lib/Entity';
import GameGenerator from '/GameGenerator';
import Tile from 'shattered-lib/Tile';
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
      const visionComponent = new UIVisionComponent();
      const proto =visionComponent.__proto__.__proto__;
      visionComponent.__proto__.__proto__ = {
        ...visionComponent.__proto__.__proto__, updateFov: ()=> {
        }
      };
      const newlyVisibleTile = new Tile();
      const alreadyVisibleTile = new Tile();
      const noLongerVisibleTile = new Tile();
      visionComponent._previousFov = [alreadyVisibleTile, noLongerVisibleTile];
      visionComponent.fov = [newlyVisibleTile, alreadyVisibleTile];

      noLongerVisibleTile._handlers.add({eventName: events.onEntityAdded, callback: ()=>{}, component: visionComponent, priority: 0});
      noLongerVisibleTile._handlers.add({eventName: events.onEntityRemoved, callback: ()=>{}, component: visionComponent, priority: 0});
      expect(noLongerVisibleTile._handlers._handlersByEvent[events.onEntityAdded].length).to.equal(1);
      expect(noLongerVisibleTile._handlers._handlersByEvent[events.onEntityRemoved].length).to.equal(1);

      visionComponent.updateFov();

      expect(noLongerVisibleTile._handlers._handlersByEvent[events.onEntityAdded].length).to.equal(0);
      expect(noLongerVisibleTile._handlers._handlersByEvent[events.onEntityRemoved].length).to.equal(0);

      visionComponent.__proto__.__proto__ = proto;
    });

    it('should notify the ui of the fov changes', ()=> {
      const visionComponent = new UIVisionComponent();
      const proto =visionComponent.__proto__.__proto__;
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
        channel: 'ui',
        topic: 'vision.reset',
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

    it(`should subscribe to all tiles in the field-of-view (fov)`, () => {
      const visionComponent = new UIVisionComponent();
      const proto =visionComponent.__proto__.__proto__;
      visionComponent.__proto__.__proto__ = {
        ...visionComponent.__proto__.__proto__, updateFov: ()=> {
        }
      };
      const newlyVisibleTile1 = new Tile();
      const newlyVisibleTile2 = new Tile();
      const noLongerVisibleTile1 = new Tile();
      const noLongerVisibleTile2 = new Tile();
      visionComponent._previousFov = [noLongerVisibleTile1, noLongerVisibleTile2];
      visionComponent.fov = [newlyVisibleTile1, newlyVisibleTile2];

      visionComponent.updateFov();


      const shouldBeAVisionComponentHandler = handler=> handler.component === visionComponent;
      const hasTileHandlers = tile=> {
        const result = tile._handlers._handlersByEvent[events.onEntityAdded].some(shouldBeAVisionComponentHandler)
          && tile._handlers._handlersByEvent[events.onEntityRemoved].some(shouldBeAVisionComponentHandler);
        return result;
      };
      expect(visionComponent.fov.every(hasTileHandlers)).to.be.true;

      visionComponent.__proto__.__proto__ = proto;
    });
  });

  describe('onEntityAdded', () => {
    it('should publish a tile update', ()=> {
      const visionComponent = new UIVisionComponent();
      const tile = {};
      let wasCalled = false;
      const subscription = postal.subscribe({
        channel: 'ui',
        topic: 'vision.update',
        callback: (data)=> {
          wasCalled = true;
          expect(data.tile).to.equal(tile);
        }
      });

      visionComponent.onEntityAdded({tile});

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
        channel: 'ui',
        topic: 'vision.update',
        callback: (data)=> {
          wasCalled = true;
          expect(data.tile).to.equal(tile);
        }
      });

      visionComponent.onEntityRemoved({tile});

      subscription.unsubscribe();
      expect(wasCalled).to.be.true;
    });
  });
});
