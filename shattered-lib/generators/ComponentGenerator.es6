'use strict';
import idGenerator from './idGenerator';

export default class ComponentGenerator {

  generate(componentName) {
    const Component = ComponentGenerator._components[componentName];
    const component = new Component();
    component._key = Component._name;
    component.id = idGenerator.generate();

    return component;
  }
}

ComponentGenerator._components = {};
