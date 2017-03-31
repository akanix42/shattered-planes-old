'use strict';
import {serializable} from '/lib/jsonc';
import Handler from '/event-system/Handler';

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

  addHandler(event, priority, callback) {
    this.handlers.push(new Handler(event, priority, this, callback));
  }

}
