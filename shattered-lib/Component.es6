'use strict';
import {serializable} from 'jsonc';

@serializable('Component', {exclude: ['handlers']})
class Component {
  entity = null;
  handlers = [];
  id = null;

  constructor(stats) {
    this._stats = stats || {};
  }

  addHandler(eventName, priority, callback) {
    this.handlers.push({eventName, priority, callback, component: this});
  }

}

export default Component;
