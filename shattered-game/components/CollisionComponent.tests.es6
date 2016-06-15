'use strict';
import CollisionComponent from './CollisionComponent';
import events from '/events';
import Entity from 'shattered-lib/Entity';
import chai from 'chai';

chai.should();

describe('CollisionComponent', ()=> {
  describe('onPosition', () => {
    it(`should emit a willNotCollide event`, () => {
      const collisionComponent = new CollisionComponent();
      const entity = new Entity();
      entity.addComponent(collisionComponent);

      let result = {};
      const destination = {
        emit(event) {
          result = event;
        }
      };
      collisionComponent.onPosition({destination});
      result.should.eql({name: events.willNotCollide, entity: entity});
    });

    it(`should return the result of the willNotCollide event`, () => {
      const collisionComponent = new CollisionComponent();
      const entity = new Entity();
      entity.addComponent(collisionComponent);

      let expectedResult = 'test';
      const destination = {
        emit(event) {
          return expectedResult;
        }
      };
      const result = collisionComponent.onPosition({destination});
      result.should.equal(expectedResult);
    });

  });

  describe('Handlers', () => {
    it('should listen to onPosition events', () => {
      const collisionComponent = new CollisionComponent();
      collisionComponent.handlers.find(handler=>handler.eventName === events.move).should.be.ok;
    });

    it('should listen to willNotCollide events', () => {
      const collisionComponent = new CollisionComponent();
      collisionComponent.handlers.find(handler=>handler.eventName === events.willNotCollide).should.be.ok;
    });
  });
});
