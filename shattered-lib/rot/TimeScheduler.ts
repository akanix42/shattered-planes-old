'use strict';
import {serializable} from 'jcson';
import TimeQueue from './TimeQueue';
import IActor from "./IActor";

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

  add(item: IActor, time: number) {
    this._queue.add(item, time || 1);
    return this;
  }

  clear() {
    this._queue.clear();
    return this;
  }

  remove(item: IActor) {
    this._queue.remove(item);
  }

  next() {
    return this._queue.get();
  }
}

