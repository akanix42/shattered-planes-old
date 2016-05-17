'use strict';
import chai from 'chai';
import EntitiesByPriority from './EntitiesByPriority.js';

chai.should();

describe('EntitiesByPriority', () => {

  describe('add', ()=> {
    it('should add the entity', ()=> {
      const entities = new EntitiesByPriority();
      const entity = {};

      entities.add(entity, 0);
    });
  });

  describe('emit', ()=> {

    it(`should emit the event to all entities in priority order`, ()=> {
      const entities = new EntitiesByPriority();
      let calledFirst = [];
      const entity1 = {};
      entity1.emit = () => calledFirst.push(entity1);
      const entity2 = {emit: () => calledFirst.push(entity2)};
      const entity3 = {emit: () => calledFirst.push(entity3)};

      entities.add(entity2, 10);
      entities.add(entity1, 0);
      entities.add(entity3, 20);

      const event = {name: 'test'};
      entities.emit(event);

      calledFirst[0].should.equal(entity1);
      calledFirst[1].should.equal(entity2);
      calledFirst[2].should.equal(entity3);
    });

    it(`should pass the event to the entity`, ()=> {
      const entities = new EntitiesByPriority();
      let handledEvent;
      const entity = {emit: event => handledEvent = event};
      entities.add(entity, 0);

      const event = {name: 'test'};
      entities.emit(event);

      handledEvent.should.equal(event);
    });

    it(`should return the updated event from the handler's callback`, ()=> {
      const entities = new EntitiesByPriority();
      let updatedEvent = {};
      const entity = {emit: event => updatedEvent};
      entities.add(entity, 0);

      const event = {name: 'test'};
      const result = entities.emit(event);
      result.should.equal(updatedEvent);
    });
  });

  describe('remove', ()=> {

    it('should remove the entity', ()=> {
      const entities = new EntitiesByPriority();
      let eventWasHandled = false;
      const entity = {emit: () => eventWasHandled = true};

      entities.add(entity, 0);
      entities.remove(entity);
      entities.emit({});

      eventWasHandled.should.be.false;
    });


  });

});
