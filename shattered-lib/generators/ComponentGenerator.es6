'use strict';
import idGenerator from './idGenerator';

export default class ComponentGenerator {
  _components = {};

  generate(componentName) {
    const Component = this._components[componentName];
    const component = new Component();
    component.id = idGenerator.generate();

    return component;
  }
}
