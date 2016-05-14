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
