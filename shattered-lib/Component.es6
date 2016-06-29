'use strict';
import {serializable} from 'jsonc';

@serializable('Component', {exclude: ['handlers']})
class Component {
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

export default Component;
