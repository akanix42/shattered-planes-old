'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.default = undefined;var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();

var _IncrementalSet = require('./IncrementalSet');var _IncrementalSet2 = _interopRequireDefault(_IncrementalSet);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 

SubscribedHandlers = function () {
  function SubscribedHandlers() {_classCallCheck(this, SubscribedHandlers);
    this._events = new _IncrementalSet2.default();
    this._subscribedComponents = new Set();
    this._handlersByEvent = {};}_createClass(SubscribedHandlers, [{ key: 'add', value: function add(


    subscription) {
      this._events.add(subscription.eventName);

      var handlers = this._handlersByEvent[subscription.eventName] || (this._handlersByEvent[subscription.eventName] = []);
      handlers.push(subscription);
      handlers.sort(function (subscriptionA, subscriptionB) {return subscriptionA.priority - subscriptionB.priority;});

      this._subscribedComponents.add(subscription.component);} }, { key: 'emit', value: function emit(


    event) {
      if (!this._events.has(event.name)) 
      return;

      var eventHandlers = this._handlersByEvent[event.name];
      for (var handlerIndex = 0; handlerIndex < eventHandlers.length; handlerIndex++) {
        var handler = eventHandlers[handlerIndex];
        var result = handler.callback.call(handler.component || this, event);
        if (result === false) 
        break;else 

        event = result || event;}

      return event;} }, { key: 'removeComponent', value: function removeComponent(


    component) {var _this = this;
      if (!this._subscribedComponents.has(component)) 
      return;

      component.handlers.forEach(function (handler) {return _this.remove(handler);});
      this._subscribedComponents.delete(component);} }, { key: 'remove', value: function remove(



    subscription) {
      if (!this._events.has(subscription.eventName)) 
      return;

      var handlers = this._handlersByEvent[subscription.eventName];
      handlers.splice(handlers.indexOf(subscription), 1);

      this._events.delete(subscription.eventName);} }]);return SubscribedHandlers;}();exports.default = SubscribedHandlers;
//# sourceMappingURL=SubscribedHandlers.js.map
