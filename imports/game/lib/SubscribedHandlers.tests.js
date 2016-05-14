'use strict';
import chai from 'chai';
import SubscribedHandlers from './SubscribedHandlers.js';

chai.should();

describe('SubscribedHandlers', () => {

  describe('add', ()=> {
    it('should add a handler', ()=> {
      const subscriptions = new SubscribedHandlers();
      const handler = {eventName: 'test', priority: 0, component: {}};

      subscriptions.add(handler);
      subscriptions.events.has(handler.eventName).should.be.true;
    });
  });

  describe('remove', ()=> {

    it('should remove a handler', ()=> {
      const subscriptions = new SubscribedHandlers();
      const handler = {eventName: 'test', priority: 0, component: {}};

      subscriptions.add(handler);
      subscriptions.remove(handler);
      subscriptions.events.has(handler.eventName).should.be.false;
    });

    it('should remove the event only after all handlers for the event have been removed', ()=> {
      const subscriptions = new SubscribedHandlers();
      const handler1 = {eventName: 'test', priority: 0, component: {}};
      const handler2 = {eventName: 'test', priority: 0, component: {}};

      subscriptions.add(handler1);
      subscriptions.add(handler2);
      subscriptions.remove(handler1);
      subscriptions.events.has(handler1.eventName).should.be.true;
      subscriptions.remove(handler2);
      subscriptions.events.has(handler2.eventName).should.be.false;
    });

  });

  describe('removeComponent', ()=> {

    it('should remove all of the components handlers', ()=> {
      const subscriptions = new SubscribedHandlers();
      const component = {
        handlers: []
      };
      component.handlers.push({eventName: 'test', priority: 0, component});
      component.handlers.push({eventName: 'test2', priority: 0, component});

      subscriptions.add(component.handlers[0]);
      subscriptions.add(component.handlers[1]);
      subscriptions.removeComponent(component);

      subscriptions.events.has(component.handlers[0].eventName).should.be.false;
      subscriptions.events.has(component.handlers[1].eventName).should.be.false;
    });

  });
});