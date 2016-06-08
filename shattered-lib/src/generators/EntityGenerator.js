'use strict';

import Entity from '../Entity';
import ComponentGenerator from './ComponentGenerator';

export default class EntityGenerator {
  _templates = {};
  _componentGenerator = new ComponentGenerator();
  _Entity = Entity;
  
  generate(templateName) {
    const template = this._templates[templateName];
    const entity = new this._Entity();
    entity.template = template;
    if (template.components)
      template.components.forEach(componentName=> {
        entity.addComponent(this._componentGenerator.generate(componentName));
      });

    return entity;
  }
}
