'use strict';
import {serializable} from 'shattered-lib/lib/jsonc';

@serializable('Component', {exclude: ['handlers']})
export default class Component {
  entity = null;
  handlers = [];
  id = null;
  _key = null;
  
  constructor(game) {
    this.game = game;
    this._key = this.constructor._name;
  }

  init(){

  }

  addHandler(eventName, priority, callback) {
    this.handlers.push({eventName, priority, callback, component: this});
  }

}
