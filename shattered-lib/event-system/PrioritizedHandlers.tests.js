'use strict';
import chai from 'chai';
import PrioritizedHandlers from './PrioritizedHandlers.js';
import Handler from './Handler';
import eventTypes, {eventPriorities} from './eventTypes';
import Event from './Event';

const expect = chai.expect;

describe('PrioritizedHandlers', () => {

  describe('add', ()=> {
    it('should add a handler', ()=> {
      const handlers = new PrioritizedHandlers();
      const handler = new Handler(eventTypes.test, eventPriorities.BEFORE, {});

      handlers.add(handler);
      expect(handlers._handlersByPriority[handler.priority][handler.eventType.id][0]).to.equal(handler);
    });

    it('should record the handler\'s index', ()=> {
      const handlers = new PrioritizedHandlers();
      const handler = new Handler(eventTypes.test, eventPriorities.BEFORE, {});

      handlers.add(handler);
      expect(handlers._handlersById[handler.id]).to.equal(0);
    });

  });

  describe('emit', ()=> {

    it("should emit the event to all of that event's handlers", ()=> {
      const subscriptions = new PrioritizedHandlers();
      let handler1Called = false;
      let handler2Called = false;
      let handler3Called = false;
      const handler1 = new Handler(eventTypes.test, eventPriorities.BEFORE, {}, event => handler1Called = true);
      const handler2 = new Handler(eventTypes.test, eventPriorities.BEFORE, {}, event => handler2Called = true);
      const handler3 = new Handler(eventTypes.test, eventPriorities.DURING, {}, event => handler3Called = true);

      subscriptions.add(handler1);
      subscriptions.add(handler2);
      subscriptions.add(handler3);

      const event = new Event(eventTypes.test);
      subscriptions.emit(event);

      expect(handler1Called).to.be.true;
      expect(handler2Called).to.be.true;
      expect(handler3Called).to.be.true;
    });

    it('should pass the event to the handler\'s callback', ()=> {
      const subscriptions = new PrioritizedHandlers();
      let handledEvent;
      const handler = new Handler(eventTypes.test, eventPriorities.BEFORE, {}, event => handledEvent = event);
      const event = new Event(eventTypes.test);
      subscriptions.add(handler);
      subscriptions.emit(event);

      expect(handledEvent).to.equal(event);
    });

    it(`should call the event using the handler's context`, ()=> {
      const subscriptions = new PrioritizedHandlers();
      let handledEvent;
      let context = {};
      let calledContext;
      function callback( ) {
        calledContext=this;
      }
      const handler = new Handler(eventTypes.test, eventPriorities.BEFORE, context, callback);
      const event = new Event(eventTypes.test);
      subscriptions.add(handler);
      subscriptions.emit(event);

      expect(calledContext).to.equal(context);
    });

    it("should return the event with updates from the handler's callback", ()=> {
      const subscriptions = new PrioritizedHandlers();
      let updatedEvent = {};
      const handler = new Handler(eventTypes.test, eventPriorities.BEFORE, {}, event => event.data.updatedEvent = updatedEvent);
      const event = new Event(eventTypes.test);

      subscriptions.add(handler);
      const result = subscriptions.emit(event);

      expect(result.data.updatedEvent).to.equal(updatedEvent);
    });

    it(`should cancel the event if the callback returns false`, ()=> {
      const subscriptions = new PrioritizedHandlers();
      const handler = new Handler(eventTypes.test, eventPriorities.BEFORE, {}, event => false);
      const event = new Event(eventTypes.test);

      subscriptions.add(handler);
      const result = subscriptions.emit(event);

      expect(result.isCanceled).to.be.true;
    });

    it(`should stop emitting the event if it is canceled`, ()=> {
      const subscriptions = new PrioritizedHandlers();
      let handler1Called = false;
      let handler2Called = false;
      let handler3Called = false;
      const handler1 = new Handler(eventTypes.test, eventPriorities.BEFORE, {}, event => !(handler1Called = true));
      const handler2 = new Handler(eventTypes.test, eventPriorities.BEFORE, {}, event => handler2Called = true);
      const handler3 = new Handler(eventTypes.test, eventPriorities.DURING, {}, event => handler3Called = true);

      subscriptions.add(handler1);
      subscriptions.add(handler2);

      const event = new Event(eventTypes.test);
      subscriptions.emit(event);

      expect(handler1Called).to.be.true;
      expect(handler2Called).to.be.false;
      expect(handler3Called).to.be.false;
    });

  });

  describe('remove', ()=> {

    it('should remove a handler', ()=> {
      const handlers = new PrioritizedHandlers();
      const handler = new Handler(eventTypes.test, eventPriorities.BEFORE, {}, event => false);

      handlers.add(handler);
      handlers.remove(handler);
      expect(handlers._handlersById[handler.id]).to.be.undefined;
      expect(handlers._handlersByPriority[handler.priority][handler.eventType.id].length).to.equal(0);
    });

  });
});
