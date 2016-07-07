'use strict';
import CollisionComponent from './CollisionComponent';
import events from '/events';
import Entity from 'shattered-lib/Entity';

import chai from 'chai';
chai.should();
const expect = chai.expect;

describe('CollisionComponent', ()=> {
  describe('onPosition', () => {
    it(`should emit a willNotCollide event`, (done) => {
      const collisionComponent = new CollisionComponent();
      const entity = new Entity();
      entity.addComponent(collisionComponent);

      const destination = {
        emit(event) {
          expect(event).to.eql({name: events.willNotCollide, entity: entity});
          done();
          return event;
        }
      };
      collisionComponent.onPosition({destination});
    });

    it(`should be canceled if the willNotCollide event was canceled`, () => {
      const collisionComponent = new CollisionComponent();
      const entity = new Entity();
      entity.addComponent(collisionComponent);

      let shouldBeCanceled = true;
      const destination = {
        emit(event) {
          return {isCanceled: shouldBeCanceled};
        }
      };
      const event = {destination};
      collisionComponent.onPosition(event);
      expect(event.isCanceled).to.equal(shouldBeCanceled);
    });

    it(`should not be canceled if the willNotCollide event was not canceled`, () => {
      const collisionComponent = new CollisionComponent();
      const entity = new Entity();
      entity.addComponent(collisionComponent);

      let shouldBeCanceled = false;
      const destination = {
        emit(event) {
          return {isCanceled: shouldBeCanceled};
        }
      };
      const event = {destination};
      collisionComponent.onPosition(event);
      expect(event.isCanceled).to.equal(shouldBeCanceled);
    });

  });

  describe('Handlers', () => {
    it('should listen to onPosition events', () => {
      const collisionComponent = new CollisionComponent();
      collisionComponent.handlers.find(handler=>handler.eventName === events.onPosition).should.be.ok;
    });

    it('should listen to willNotCollide events', () => {
      const collisionComponent = new CollisionComponent();
      collisionComponent.handlers.find(handler=>handler.eventName === events.willNotCollide).should.be.ok;
    });
  });
});
