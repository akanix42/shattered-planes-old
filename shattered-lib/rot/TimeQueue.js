'use strict';
import { serializable } from '/lib/jsonc';
import postal from '/lib/postal';
import SortedArray from '/lib/SortedArray';

@serializable('TimeQueue')
export default class TimeQueue {
  constructor(timePerTurn = 1000) {
    this.time = 0;
    this._lastTurn = 0;
    this._turn = 0;
    this.timePerTurn = timePerTurn;
    this._queue = new SortedArray(null, function sortByTime(a, b) {
      if (a.time === b.time) return 0;

      return a.time < b.time ? -1 : 1;
    });
    this._freeElements = [];
  }

  get turn() {
    return Math.floor(this._turn);
  }

  clear() {
    for (let i = 0; i < this._queue.array.length; i++)
      this._freeElements.push(this._queue.array[i]);
    this._queue.array.length = 0;
    return this;
  }

  add(item, time) {
    this._queue.push(this._getEvent(item, time));
  }

  _getEvent(item, time) {
    var element = this._freeElements.pop();
    if (element === undefined) return { item, time };
    element.item = item;
    element.time = time;

    return element;
  }

  get() {
    if (!this._queue.array.length) {
      return null;
    }

    var element = this._queue.array.shift();
    var time = element.time;
    if (time > 0) { /* advance */
      this.time += time;
      this._updateTurn(time);
      for (var i = 0; i < this._queue.array.length; i++) {
        this._queue.array[i].time -= time;
      }
    }

    this._freeElements.push(element);

    return element.item;
  }

  _updateTurn(time) {
    this._turn += time / this.timePerTurn;
    let currentTurn = Math.floor(this._turn);
    if (currentTurn > this._lastTurn) {
      postal.publish({
        channel: 'ui',
        topic: 'turn.update',
        data: {
          turn: currentTurn
        }
      });
    }

    this._lastTurn = currentTurn;
  }

  remove(item) {
    return this._queue.remove(event);
  }
}
