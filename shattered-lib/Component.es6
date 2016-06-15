'use strict';
import {serializable} from 'jsonc';

@serializable('Component', {exclude: ['handlers']})
class Component {
  entity = null;
  handlers = [];
  id = null;
  _key = null;
  
  constructor() {
    this._key = this.constructor._name;
  }

  addHandler(eventName, priority, callback) {
    this.handlers.push({eventName, priority, callback, component: this});
  }

}

export default Component;
