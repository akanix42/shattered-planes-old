'use strict';

import Components from '/imports/game/components/components';

export default class ComponentGenerator {
  _components = Components;

  generate(componentName) {
    const Component = this._components[componentName];
    const component = new Component();

    return component;
  }
}
