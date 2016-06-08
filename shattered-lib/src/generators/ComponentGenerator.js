'use strict';

export default class ComponentGenerator {
  _components = {};

  generate(componentName) {
    const Component = this._components[componentName];
    const component = new Component();

    return component;
  }
}
