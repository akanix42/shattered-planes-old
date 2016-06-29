'use strict';
import idGenerator from './idGenerator';

export default class ComponentGenerator {
  constructor(game = {}) {
    this._game = game;
  }

  generate(Component) {
    const component = new Component(this._game);
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
