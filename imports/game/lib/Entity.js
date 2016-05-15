'use strict';
import {serializable} from 'jsonc';
import SubscribedHandlers from './SubscribedHandlers';

@serializable('Entity')
class Entity {
  _components = [];
  subscribedHandlers = new SubscribedHandlers();

  addComponent(component) {
    if (component._key in this._components)
      throw new Error(`Component ${_key} already exists for entity ${_this}`);

    this._components[component._key] = component;
    return this;
  }

  removeComponent(key) {
    delete this._components[key];
  }


  subscribeComponent(component) {
    component.handlers.forEach(subscription => this.subscribedHandlers.add(subscription, component));
  }

  unsubscribeComponent(component) {
    this.subscribedHandlers.removeComponent(component);
  }

  emit(event) {
    return this.subscribedHandlers.emit(event);
  }
}

export default Entity;