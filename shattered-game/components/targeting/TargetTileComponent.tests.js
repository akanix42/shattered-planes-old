import TargetTileComponent from './TargetTileComponent';
import events from '/eventTypes';
import Entity from 'shattered-lib/Entity';

import chai from 'chai';
const expect = chai.expect;

describe('TargetTileComponent', ()=> {
  describe('constructor', () => {
    it('should set the target to the passed in target', () => {
      let target = {};
      const targetTileComponent = new TargetTileComponent({ }, { target });
      expect(targetTileComponent.target).to.equal(target);
    });
  });

  describe('onPositionChanged', () => {
    it('should emit a targetReached event if the target position equals the onPosition destination', () => {
      let result;
      const target = {};
      const targetTileComponent = new TargetTileComponent({ }, { target });
      const entity = targetTileComponent.entity = new Entity;
      entity.emit = (data) => result = data;

      targetTileComponent.onPositionChanged({data: {destination: target}});
      expect(result.type).to.equal(events.onTargetReached);
    });

    it('should not emit a targetReached event if the target position does not equal the onPosition destination', () => {
      let wasCalled =false;
      const target = {};
      const targetTileComponent = new TargetTileComponent({ }, { target });
      const entity = targetTileComponent.entity = new Entity;
      entity.emit = (data) => wasCalled = true;

      targetTileComponent.onPositionChanged({data: {destination: {}}});
      expect(wasCalled).to.be.false;
    });
  });

  describe('Handlers', () => {
    it('should listen to onPosition events', () => {
      const targetTileComponent = new TargetTileComponent;
      expect(targetTileComponent.handlers.find(handler=>handler.eventType === events.onPosition)).to.be.ok;
    });
  });
});
