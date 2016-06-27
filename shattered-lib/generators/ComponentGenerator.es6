'use strict';
import idGenerator from './idGenerator';

export default class ComponentGenerator {

  generate(Component) {
    const component = new Component();
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
