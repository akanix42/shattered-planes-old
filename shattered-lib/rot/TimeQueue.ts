'use strict';
import { serializable } from 'jcson';
import postal from 'lib/postal';
import SortedArray from 'lib/SortedArray';
import IActor from "./IActor";

interface ITimeQueueElement {
  time: number;
  item: IActor;
}

@serializable('TimeQueue')
export default class TimeQueue {
  public time: number;
  private _lastTurn: number;
  private _turn: number;
  private timePerTurn: number;

  private _freeElements: Array<ITimeQueueElement>;
  private _queue: SortedArray<ITimeQueueElement>;

  constructor(timePerTurn = 1000) {
    this.time = 0;
    this._lastTurn = 0;
    this._turn = 0;
    this.timePerTurn = timePerTurn;
    this._queue = new SortedArray(null, this._sortByTime);
    this._freeElements = [];
  }

  private _sortByTime(a: ITimeQueueElement, b: ITimeQueueElement): SortResult {
    if (a.time === b.time) return 0;

    return a.time < b.time ? -1 : 1;
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

  add(item: IActor, time: number) {
    this._queue.push(this._getEvent(item, time));
  }

  private _getEvent(item: IActor, time: number): ITimeQueueElement {
    const element = this._freeElements.pop();
    if (element === undefined) return { item, time };
    element.item = item;
    element.time = time;

    return element;
  }

  get() {
    if (!this._queue.array.length) {
      return null;
    }

    const element = this._queue.array.shift() as ITimeQueueElement;
    const time = element.time;
    if (time > 0) { /* advance */
      this.time += time;
      this._updateTurn(time);
      for (let i = 0; i < this._queue.array.length; i++) {
        this._queue.array[i].time -= time;
      }
    }

    this._freeElements.push(element);

    return element.item;
  }

  private _updateTurn(time: number) {
    this._turn += time / this.timePerTurn;
    let currentTurn = Math.floor(this._turn);
    if (currentTurn > this._lastTurn) {
      postal.publish({
        topic: 'ui.turn.update',
        data: {
          turn: currentTurn
        }
      });
    }

    this._lastTurn = currentTurn;
  }

  remove(item: ITimeQueueElement) {
    this._queue.remove(item);
  }
}
