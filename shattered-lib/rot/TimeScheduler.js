'use strict';
import { serializable } from '/lib/jsonc';
import TimeQueue from './TimeQueue';

@serializable('TimeScheduler')
export default class TimeScheduler {
  _queue = new TimeQueue();
  _current = null;

  get time() {
    return this._queue.time;
  }

  get turn() {
    return this._queue.turn;
  }

  add(item, time) {
    this._queue.add(item, time||1);
    return this;
  }

  clear() {
    this._queue.clear();
    return this;
  }

  remove() {
    this._queue.remove(item);
  }

  next() {
    return this._queue.get();
  }
}

