'use strict';
import {serializable} from 'jsonc';
import SubscribedHandlers from './SubscribedHandlers';
import Attributes from './Attributes';

@serializable('Entity')
class Entity {
  _components = [];
  stats = {};
  subscribedHandlers = new SubscribedHandlers();
  tile = null;
  attributes = new Attributes();
  id = null;

  addComponent(component) {
    if (component._key in this._components)
      throw new Error(`Component ${component._key} already exists for entity ${this}`);

    this._components[component._key] = component;
    component.entity = this;
    this.subscribeComponent(component);
    return this;
  }

  removeComponent(key) {
    const component = this._components[key];
    if (!component)
      return;

    this.unsubscribeComponent(component);
    delete this._components[key];
    component.entity = null;
  }

  addStat(name) {
    if (name in this.stats)
      return;

    Object.defineProperty(this.stats, name, {
      get: () => this.emit({name: 'onStat.' + name}),
      configurable: true,
      enumerable: true
    });
  }

  removeStat(name) {
    delete this.stats[name];
  }

  subscribeComponent(component) {
    component.handlers.forEach(subscription => {
      subscription.component = component;
      this.subscribedHandlers.add(subscription)
    });
  }

  unsubscribeComponent(component) {
    this.subscribedHandlers.removeComponent(component);
  }

  emit(event) {
    return this.subscribedHandlers.emit(event);
  }
}

export default Entity;
