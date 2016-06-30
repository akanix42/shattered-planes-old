'use strict';

import IncrementalSet from './IncrementalSet';
import {serializable} from 'shattered-lib/lib/jsonc';

@serializable('SubscribedHandlers')
export default class SubscribedHandlers {
  _events = new IncrementalSet();
  _subscribedComponents = new Set();
  _handlersByEvent = {};

  add(subscription) {
    this._events.add(subscription.eventName);

    const handlers = this._handlersByEvent[subscription.eventName] || (this._handlersByEvent[subscription.eventName] = []);
    handlers.push(subscription);
    handlers.sort(sortHandlers);

    this._subscribedComponents.add(subscription.component);

    function sortHandlers(subscriptionA, subscriptionB) {
      const sortByPriority = (subscriptionA, subscriptionB) => subscriptionA.priority - subscriptionB.priority;
      const sortByComponent = (subscriptionA, subscriptionB) => subscriptionA.component.id - subscriptionB.component.id;
      const sortByEntity = (subscriptionA, subscriptionB) => subscriptionA.component.entity.id - subscriptionB.component.entity.id;

      let result = sortByPriority(subscriptionA, subscriptionB);
      if (result !== 0)
        return result;

      result = sortByComponent(subscriptionA, subscriptionB);
      return result;
    }
  }

  emit(event) {
    if (!this._events.has(event.name))
      return event;

    const eventHandlers = this._handlersByEvent[event.name];
    for (let handlerIndex = 0; handlerIndex < eventHandlers.length; handlerIndex++) {
      let handler = eventHandlers[handlerIndex];
      let result = handler.callback.call(handler.component || this, event);

      if (result === false)
        event.isCanceled = true;
      if (event.isCanceled)
        break;
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
