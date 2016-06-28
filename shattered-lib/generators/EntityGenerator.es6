'use strict';

import Entity from '../Entity';
import ComponentGenerator from './ComponentGenerator';

export default class EntityGenerator {
  _componentGenerator = new ComponentGenerator();
  _Entity = Entity;

  generate(templateName) {
    const template = EntityGenerator._templates[templateName];
    const entity = new this._Entity();
    entity.template = template;
    if (template.attributes) {
      const attributes = Object.keys(template.attributes);
      attributes.forEach(attribute=>entity.attributes.add(attribute, template.attributes[attribute]));
    }
    if (template.components)
      template.components.forEach(componentName=> {
        entity.addComponent(this._componentGenerator.generate(componentName));
      });

    return entity;
  }
}

EntityGenerator._templates = {};
