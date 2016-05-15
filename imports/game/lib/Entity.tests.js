'use strict';
import chai from 'chai';
import Entity from './Entity.js';

chai.should();

describe('Entity', () => {
  describe('addComponent', ()=> {

    it('should add a new component', ()=> {
      const entity = new Entity();
      const component = {_key: 'component'};
      entity.addComponent(component);

      entity._components['component'].should.equal(component);
    });
  });

  describe('removeComponent', ()=> {

    it('should remove an existing component', ()=> {
      const entity = new Entity();
      entity._components = {_key: 'component'};
      entity.removeComponent('component');

      entity._components.should.not.have.property('component');
    });

  });

  describe('emit', ()=> {

    it('should emit the event to the subscribed handlers', ()=> {
      const entity = new Entity();
      let wasEventEmitted =false;
      entity.subscribedHandlers = {emit: event => wasEventEmitted = true};
      entity.emit({});

      wasEventEmitted.should.be.true;
    });

    it('should return the updated event', ()=> {
      const entity = new Entity();
      let updatedEvent = {};
      entity.subscribedHandlers = {emit: event => updatedEvent};
      const result = entity.emit({});

      result.should.equal(updatedEvent);
    });

  });

  it('should be serializable', () => {
    Entity.__type__.should.equal('Entity');
  });

});