import OccupantComponent from './OccupantComponent';
import events from '/events';
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
      occupantComponent.onPositionChanged({destination});
      entity.tile.should.equal(destination);
    });
  });
  
  describe('Handlers', () => {
    it('should listen to onPositioned events', () => {
      const occupantComponent = new OccupantComponent();
      const entity = new Entity();
      entity.addComponent(occupantComponent);

      const destination = new Tile();
      entity.emit({name: events.onPosition, destination});
      entity.tile.should.equal(destination);
    });
  });
});
