'use strict';

export default class Component {
  entity = null;
  _handlers = [];

  constructor(stats) {
    this._stats = stats || {};
  }

  addHandler(eventName, priority, callback) {
    this._handlers.push({eventName, priority, callback, component: this});
  }


}