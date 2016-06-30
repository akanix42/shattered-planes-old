'use strict';

import Entity from '../Entity';
import {serializable} from 'shattered-lib/lib/jsonc';

@serializable('EntityGenerator')
export default class EntityGenerator {
  _Entity = Entity;

  constructor(game = {}) {
    this._game = game;
    this._componentGenerator = game.componentGenerator;
  }

  generate(template) {
    const entity = new this._Entity();
    entity.template = template;
    if (template.attributes) {
      const attributes = Object.keys(template.attributes);
      attributes.forEach(attribute=>entity.attributes.add(attribute, template.attributes[attribute]));
    }
    if (template.components)
      template.components.forEach(component=> {
        entity.addComponent(this._componentGenerator.generate(component));
      });
    return entity;
  }

  generateByName(templateName) {
    const template = EntityGenerator._templates[templateName];
    return this.generate(template);
  }
}

EntityGenerator._templates = {};

