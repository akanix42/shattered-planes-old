'use strict';

import IncrementalSet from './IncrementalSet';

export default class SubscribedHandlers {
  constructor() {
    this._events = new IncrementalSet();
    this._subscribedComponents = new Set();
    this._handlersByEvent = {};
  }

  add(subscription) {
    this._events.add(subscription.eventName);

    const handlers = this._handlersByEvent[subscription.eventName] || (this._handlersByEvent[subscription.eventName] = []);
    handlers.push(subscription);
    handlers.sort((subscriptionA, subscriptionB) => subscriptionA.priority - subscriptionB.priority);

    this._subscribedComponents.add(subscription.component);
  }

  emit(event) {
    if (!this._events.has(event.name))
      return;

    const eventHandlers = this._handlersByEvent[event.name];
    for (let handlerIndex = 0; handlerIndex < eventHandlers.length; handlerIndex++) {
      let handler = eventHandlers[handlerIndex];
      let result = handler.callback.call(handler.component || this, event);
      if (result === false)
        break;
      else
        event = result || event;
    }
    return event;
  }

  removeComponent(component) {
    if (!this._subscribedComponents.has(component))
      return;

    component.handlers.forEach(handler=>this.remove(handler));
    this._subscribedComponents.delete(component);

  }

  remove(subscription) {
    if (!this._events.has(subscription.eventName))
      return;

    const handlers = this._handlersByEvent[subscription.eventName];
    handlers.splice(handlers.indexOf(subscription), 1);

    this._events.delete(subscription.eventName);
  }
}
