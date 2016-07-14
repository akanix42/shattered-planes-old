import NormalMovementComponent from './NormalMovementComponent';
import events from '/eventTypes';
import Entity from 'shattered-lib/Entity';
import chai from 'chai';

chai.should();

describe('NormalMovementComponent', ()=> {
  describe('onMove', () => {
    it(`should calculate the time cost`, () => {
      const movementComponent = new NormalMovementComponent();
      const entity = new Entity();
      entity.addComponent(movementComponent);
      entity.attributes.add('moveSpeed', 1000);

      const destination = {};
      const event = {destination};
      movementComponent.onMove(event);
      event.actionTime.should.equal(1000);
    });

  });


  describe('Handlers', () => {
    it('should listen to move events', () => {
      const movementComponent = new NormalMovementComponent();
      movementComponent.handlers.find(handler=>handler.eventName === events.move).should.be.ok;
    });
  });
});
