'use strict';
import { serializable, Serializer, Deserializer } from 'jcson';
import PrioritizedHandlers from './event-system/PrioritizedHandlers';
import Attributes from './Attributes';
import EntityGenerator from '/generators/EntityGenerator';
import Component from './Component';
import { IStringMap } from "typings/IMap";
import Tile from 'Tile';

@serializable('Entity')
export default class Entity {
  _components: IStringMap<Component> = {};
  stats = {};
  subscribedHandlers = new PrioritizedHandlers();
  tile: Tile | null;
  attributes = new Attributes();
  id = null;
  template = null;

  [Serializer.Symbols.Serialize]() {
    const obj = { ...(this as Entity) };
    obj.template = obj.template.name;
    return obj;
  }

  [Deserializer.Symbols.PostProcess]() {
    this.template = EntityGenerator._templates[this.template];
  }

  addComponent(component: Component) {
    if (component._key in this._components)
      throw new Error(`Component ${component._key} already exists for entity ${this}`);

    this._components[component._key] = component;
    component.entity = this;
    this.subscribeComponent(component);
    component.init();
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
      get: () => this.emit({ name: 'onStat.' + name }),
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
