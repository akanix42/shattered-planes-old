'use strict';
import { serializable } from 'jcson';
import Component from './Component';
import { IStringMap } from "interfaces/IMap";
interface IModifier {
  component: Component,
  name: string,
  value: number,
}

@serializable('AttributeModifiers')
export class AttributeModifiers {
  _modifiers: IModifier[] = [];
  _isUpdating = false;
  total = 0;

  add(component: Component, name: string, value: number) {
    this._isUpdating = true;

    this.remove(component, name);
    this._modifiers.push({ component, name, value });

    this._isUpdating = false;
    this.calculateTotal();
  }

  remove(component: Component, name: string) {
    const index = this._modifiers.findIndex(modifier => modifier.component === component && modifier.name === name);
    if (index < 0) return;

    this._modifiers.splice(index, 1);
    this.calculateTotal();
  }

  calculateTotal() {
    if (this._isUpdating) return;
    this.total = this._modifiers.reduce((total, modifier) => total + modifier.value, 0);
  }
}

@serializable('Attribute')
export class Attribute {
  _bonus = 0;
  modifiers = new AttributeModifiers();

  constructor(readonly name: string, private baseValue: number = 0, public baseMax: number = 0) {
  }

  get base() {
    return this.baseValue;
  }

  set base(value: number) {
    this.baseValue = Math.min(value, this.baseMax || value);
  }

  get current() {
    return this.baseValue + this.modifiers.total;
  }

}

@serializable('Attributes')
export default class Attributes {
  [key: string]: Attribute | Function;

  constructor(attributes: IStringMap<number> = {}) {
    const keys = Object.keys(attributes);
    for (let i = 0, attributeName = keys[i]; i < keys.length; i++ , attributeName = keys[i])
      this.add(attributeName, attributes[attributeName]);
  }

  add(attributeName: string, value: number) {
    if (!(attributeName in this))
      this[attributeName] = new Attribute(attributeName, value);
  }

}
