'use strict';
import idGenerator from './idGenerator';
import { serializable } from '/lib/jsonc';

@serializable('ComponentGenerator')
export default class ComponentGenerator {
  constructor(game = {}) {
    this._game = game;
  }

  generate(Component) {
    let options;
    if (Array.isArray(Component)) {
      options = Component[1];
      Component = Component[0];
    }

    const component = new Component(this._game, options);
    component._key = Component._name;
    component.id = idGenerator.generate();

    return component;
  }

  generateByName(componentName) {
    const Component = ComponentGenerator._components[componentName];
    const component = new Component();
    component._key = Component._name;
    component.id = idGenerator.generate();

    return component;
  }
}

ComponentGenerator._components = {};
