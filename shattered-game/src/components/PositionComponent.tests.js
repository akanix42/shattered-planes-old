import PositionComponent from './PositionComponent';
import events from '/events';
import Entity from 'shattered-lib/Entity';
import chai from 'chai';

chai.should();

describe('PositionComponent', ()=> {
  describe('onPosition', () => {
    it(`should update the entity's tile`, () => {
      const positionConent = new PositionComponent();
      const entity = new Entity();
      entity.addComponent(positionConent);

      const destination = {};
      positionConent.onPosition({destination});
      entity.tile.should.equal(destination);
    });
  });
  
  describe('Handlers', () => {
    it('should listen to onMove events', () => {
      const positionConent = new PositionComponent();
      const entity = new Entity();
      entity.addComponent(positionConent);

      const destination = {};
      entity.emit({name: events.move, destination});
      entity.tile.should.equal(destination);
    });
  });
});
