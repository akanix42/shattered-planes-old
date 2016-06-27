'use strict';
import chai from 'chai';
import Entity from './Entity.js';
import Attributes from './Attributes';

chai.should();
const expect = chai.expect;

describe('Entity', () => {
  describe('addComponent', ()=> {

    it('should add a new component', ()=> {
      const entity = new Entity();
      const component = {_key: 'component', handlers: [], init(){}};
      entity.addComponent(component);

      entity._components['component'].should.equal(component);
    });

    it(`should call the new component's init function`, (done)=> {
      const entity = new Entity();
      const component = {_key: 'component', handlers: [], init(){ done(); }};
      entity.addComponent(component);
    });
  });

  describe('addStat', ()=> {

    it('should add a stat', ()=> {
      const entity = new Entity();
      entity.addStat('test');

      ('test' in entity.stats).should.be.true;
    });

    it('should emit a get event when the stat is referenced', ()=> {
      const entity = new Entity();
      let eventName = '';
      entity.emit = event => eventName = event.name;

      entity.addStat('test');
      entity.stats.test;
      eventName.should.equal('onStat.test');
    });

  });

  describe('attributes', ()=> {

    it('should be an instance of Attributes', ()=> {
      const entity = new Entity();
      expect(entity.attributes).to.be.an.instanceOf(Attributes);
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
      let wasEventEmitted = false;
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
