'use strict';

import test from './Attributes.js';
import { serializable } from 'lib/jsonc.js';
import Handler from 'event-system/Handler.js';
import Entity from "Entity";
import { IGame } from "typings/IGame";
import { ISerializable } from "jcson";
import Event from "event-system/Event";
console.log(test)

@serializable('Component', {exclude: ['handlers']})
export default class Component {
  static _name: string;

  entity: Entity | null = null;
  handlers: Handler[] = [];
  id = null;

  get _key(): string {
    return (this.constructor as any as ISerializable)._name;
  }

  constructor(private game: IGame) { }

  init() {

  }

  addHandler(event: Event, priority: number, callback: Function) {
    this.handlers.push(new Handler(event, priority, this, callback));
  }

}
