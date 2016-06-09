'use strict';
import CollideComponent from './CollideComponent';
import events from '/events';
import Entity from 'shattered-lib/Entity';
import chai from 'chai';

chai.should();

describe('CollideComponent', ()=> {
  describe('onPosition', () => {
    it(`should emit a willNotCollide event`, () => {
      const collideComponent = new CollideComponent();
      const entity = new Entity();
      entity.addComponent(collideComponent);

      let result = {};
      const destination = {
        emit(event) {
          result = event;
        }
      };
      collideComponent.onPosition({destination});
      result.should.eql({name: events.willNotCollide, entity: entity});
    });

    it(`should return the result of the willNotCollide event`, () => {
      const collideComponent = new CollideComponent();
      const entity = new Entity();
      entity.addComponent(collideComponent);

      let expectedResult = 'test';
      const destination = {
        emit(event) {
          return expectedResult;
        }
      };
      const result = collideComponent.onPosition({destination});
      result.should.equal(expectedResult);
    });

  });

  describe('Handlers', () => {
    it('should listen to onPosition events', () => {
      const collideComponent = new CollideComponent();
      collideComponent.handlers.find(handler=>handler.eventName === events.move).should.be.ok;
    });

    it('should listen to willNotCollide events', () => {
      const collideComponent = new CollideComponent();
      collideComponent.handlers.find(handler=>handler.eventName === events.willNotCollide).should.be.ok;
    });
  });
});
