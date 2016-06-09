import NormalMovementComponent from './NormalMovementComponent';
import events from '/events';
import Entity from 'shattered-lib/Entity';
import chai from 'chai';

chai.should();

describe('NormalMovementComponent', ()=> {
  describe('onMove', () => {
    it(`should calculate the timen `, () => {
      const moveComponent = new MoveComponent();
      const entity = new Entity();
      entity.addComponent(moveComponent);

      const destination = {};
      moveComponent.onPosition({destination});
      entity.tile.should.equal(destination);
    });

  });
  describe('Move Handler', () => {
    it('should listen to move events', () => {
      const moveComponent = new MoveComponent();
      const entity = new Entity();
      entity.addComponent(moveComponent);

      const destination = {};
      entity.emit({name: events.move, destination});
      entity.tile.should.equal(destination);
    });
  });
});
