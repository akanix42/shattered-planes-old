'use strict';
import {serializable} from 'jsonc';

@serializable('Component', {exclude: ['_handlers']})
class Component {
  entity = null;
  _handlers = [];

  constructor(stats) {
    this._stats = stats || {};
  }

  addHandler(eventName, priority, callback) {
    this._handlers.push({eventName, priority, callback, component: this});
  }

}

export default Component;
