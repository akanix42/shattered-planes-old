'use strict';

export class AttributeModifiers {
  _modifiers = [];
  _isUpdating = false;
  total = 0;

  add(component, name, value) {
    this._isUpdating = true;

    this.remove(component, name);
    this._modifiers.push({component, name, value});

    this._isUpdating = false;
    this.calculateTotal();
  }

  remove(component, name) {
    const index = this._modifiers.findIndex(modifier=>modifier.component === component && modifier.name === name);
    if (index < 0) return;

    this._modifiers.splice(index, 1);
    this.calculateTotal();
  }

  calculateTotal() {
    if (this._isUpdating) return;
    this.total = this._modifiers.reduce((total, modifier)=> total + modifier.value, 0);
  }
}

export class Attribute {
  _base = 0;
  _bonus = 0;
  modifiers = new AttributeModifiers();

  baseMax = 0;
  name = null;

  constructor(name, value, max) {
    this.name = name;
    this._base = value;
    this._baseMax = max;
  }

  get base() {
    return this._base;
  }

  set base(value) {
    this._base = Math.min(value, this.baseMax || value);
  }

  get current() {
    return this._base + this.modifiers.total;
  }

}

export default class Attributes {
  constructor(attributes = {}) {
    const keys = Object.keys(attributes);
    for (let i = 0, attributeName = keys[i]; i < keys.length; i++, attributeName = keys[i])
      this.add(attributeName, attributes[attributeName]);
  }

  add(attributeName, value) {
    if (!(attributeName in this))
      this[attributeName] = new Attribute(attributeName, value);
  }

}


