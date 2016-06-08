'use strict';
var _chai = require('chai');var _chai2 = _interopRequireDefault(_chai);
var _SubscribedHandlers = require('./SubscribedHandlers.js');var _SubscribedHandlers2 = _interopRequireDefault(_SubscribedHandlers);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_chai2.default.should();

describe('SubscribedHandlers', function () {

  describe('add', function () {
    it('should add a handler', function () {
      var subscriptions = new _SubscribedHandlers2.default();
      var handler = { eventName: 'test', priority: 0, component: {} };

      subscriptions.add(handler);
      subscriptions._events.has(handler.eventName).should.be.true;});});



  describe('emit', function () {

    it('should emit the event to all of that event\'s handlers', function () {
      var subscriptions = new _SubscribedHandlers2.default();
      var handler1Called = false;
      var handler2Called = false;
      var handler1 = { eventName: 'test', priority: 0, component: {}, callback: function callback(event) {return handler1Called = true;} };
      var handler2 = { eventName: 'test', priority: 0, component: {}, callback: function callback(event) {return handler2Called = true;} };

      subscriptions.add(handler1);
      subscriptions.add(handler2);

      var event = { name: 'test' };
      subscriptions.emit(event);

      handler1Called.should.be.true;
      handler2Called.should.be.true;});


    it('should pass the event to the handler\'s callback', function () {
      var subscriptions = new _SubscribedHandlers2.default();
      var handledEvent = void 0;
      var handler = { eventName: 'test', priority: 0, component: {}, callback: function callback(event) {return handledEvent = event;} };
      var event = { name: 'test' };
      subscriptions.add(handler);
      subscriptions.emit(event);

      handledEvent.should.equal(event);});


    it('should return the updated event from the handler\'s callback', function () {
      var subscriptions = new _SubscribedHandlers2.default();
      var updatedEvent = {};
      var handler = { eventName: 'test', priority: 0, component: {}, callback: function callback(event) {return updatedEvent;} };
      var event = { name: 'test' };
      subscriptions.add(handler);
      var result = subscriptions.emit(event);

      result.should.equal(updatedEvent);});


    it('should return the original event if the callback returns undefined', function () {
      var subscriptions = new _SubscribedHandlers2.default();
      var handler = { eventName: 'test', priority: 0, component: {}, callback: function callback(event) {} };
      var event = { name: 'test' };
      subscriptions.add(handler);
      var result = subscriptions.emit(event);

      result.should.equal(event);});});




  describe('remove', function () {

    it('should remove a handler', function () {
      var subscriptions = new _SubscribedHandlers2.default();
      var handler = { eventName: 'test', priority: 0, component: {} };

      subscriptions.add(handler);
      subscriptions.remove(handler);
      subscriptions._events.has(handler.eventName).should.be.false;});


    it('should remove the event only after all handlers for the event have been removed', function () {
      var subscriptions = new _SubscribedHandlers2.default();
      var handler1 = { eventName: 'test', priority: 0, component: {} };
      var handler2 = { eventName: 'test', priority: 0, component: {} };

      subscriptions.add(handler1);
      subscriptions.add(handler2);
      subscriptions.remove(handler1);
      subscriptions._events.has(handler1.eventName).should.be.true;
      subscriptions.remove(handler2);
      subscriptions._events.has(handler2.eventName).should.be.false;});});




  describe('removeComponent', function () {

    it('should remove all of the components handlers', function () {
      var subscriptions = new _SubscribedHandlers2.default();
      var component = { 
        handlers: [] };

      component.handlers.push({ eventName: 'test', priority: 0, component: component });
      component.handlers.push({ eventName: 'test2', priority: 0, component: component });

      subscriptions.add(component.handlers[0]);
      subscriptions.add(component.handlers[1]);
      subscriptions.removeComponent(component);

      subscriptions._events.has(component.handlers[0].eventName).should.be.false;
      subscriptions._events.has(component.handlers[1].eventName).should.be.false;});});});
//# sourceMappingURL=SubscribedHandlers.tests.js.map
