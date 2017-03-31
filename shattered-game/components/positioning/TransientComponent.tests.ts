import TransientComponent from './TransientComponent';
import events from '/eventTypes';
import Event from 'shattered-lib/event-system/Event';
import Entity from 'shattered-lib/Entity';
import Tile from 'shattered-lib/Tile';
import chai from 'chai';

chai.should();

describe('TransientComponent', ()=> {
  describe('onPositionChanged', () => {
    it(`should update the entity's tile`, () => {
      const transientsComponent = new TransientComponent();
      const entity = new Entity();
      entity.addComponent(transientsComponent);

      const destination = new Tile();
      destination._architecture = new Entity;

      transientsComponent.onPositionChanged({ data: { destination } });
      entity.tile.should.equal(destination);
    });
  });

  describe('Handlers', () => {
    it('should listen to onPositioned events', () => {
      const transientsComponent = new TransientComponent();
      const entity = new Entity();
      entity.addComponent(transientsComponent);

      const destination = new Tile();
      destination._architecture = new Entity;

      const positionEvent = new Event(events.onPosition);
      positionEvent.data.destination = destination;
      entity.emit(positionEvent);
      entity.tile.should.equal(destination);
    });
  });
});
