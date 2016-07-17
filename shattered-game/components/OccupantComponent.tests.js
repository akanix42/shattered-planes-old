import OccupantComponent from './OccupantComponent';
import events from '/eventTypes';
import Event from 'shattered-lib/event-system/Event';
import Entity from 'shattered-lib/Entity';
import Tile from 'shattered-lib/Tile';
import chai from 'chai';

chai.should();

describe('OccupantComponent', ()=> {
  describe('onPositionChanged', () => {
    it(`should update the entity's tile`, () => {
      const occupantComponent = new OccupantComponent();
      const entity = new Entity();
      entity.addComponent(occupantComponent);

      const destination = new Tile();
      destination._architecture = new Entity;

      occupantComponent.onPositionChanged({ data: { destination } });
      entity.tile.should.equal(destination);
    });
  });

  describe('Handlers', () => {
    it('should listen to onPositioned events', () => {
      const occupantComponent = new OccupantComponent();
      const entity = new Entity();
      entity.addComponent(occupantComponent);

      const destination = new Tile();
      destination._architecture = new Entity;

      const positionEvent = new Event(events.onPosition);
      positionEvent.data.destination = destination;
      entity.emit(positionEvent);
      entity.tile.should.equal(destination);
    });
  });
});
