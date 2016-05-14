'use strict';

import IncrementalSet from './IncrementalSet';

export default class SubscribedHandlers {
  constructor() {
    this.events = new IncrementalSet();
    this.subscribedComponents = new Set();
    this.subscriptionsByEvent = {};
  }

  add(subscription) {
    this.events.add(subscription.eventName);

    const subscriptionList = this.subscriptionsByEvent[subscription.eventName] || (this.subscriptionsByEvent[subscription.eventName] = []);
    subscriptionList.push(subscription);
    subscriptionList.sort((subscriptionA, subscriptionB) => subscriptionA.priority - subscriptionB.priority);

    this.subscribedComponents.add(subscription.component);
  }

  removeComponent(component) {
    if (!this.subscribedComponents.has(component))
      return;

    component.handlers.forEach(handler=>this.remove(handler));
    this.subscribedComponents.delete(component);

  }

  remove(subscription) {
    if (!this.events.has(subscription.eventName))
      return;

    const eventSubscriptions = this.subscriptionsByEvent[subscription.eventName];
    eventSubscriptions.splice(eventSubscriptions.indexOf(subscription), 1);

    this.events.delete(subscription.eventName);
  }
}
