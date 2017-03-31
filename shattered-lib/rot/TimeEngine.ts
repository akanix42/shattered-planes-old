/**
 * Adapted from ROT.Engine
 */
'use strict';
import {serializable} from 'jcson';
import TimeScheduler from './TimeScheduler';
import {IActor} from "./IActor";

@serializable('TimeEngine')
export default class TimeEngine {
  _scheduler = new TimeScheduler;
  _lock = 1;

  get turn() {
    return this._scheduler.turn;
  }

  add(actor: IActor, time: number) {
    this._scheduler.add(actor, time);
  }

  remove(actor: IActor) {
    this._scheduler.remove(actor);
  }

  lock() {
    this._lock++;
  }

  unlock() {
    this._lock = Math.max(0, this._lock - 1);

    while (this._lock === 0) {
      const actor = this._scheduler.next();
      if (!actor) {
        this.lock();
        return;
      }
      /* no actors */
      const result = actor.act();
      if (result && result.then) { /* actor returned a "thenable", looks like a Promise */
        this.lock();
        result
          .then((time: number) => {
            if (actor.isRepeating) this._scheduler.add(actor, time);
          })
          .then(this.unlock.bind(this));
      } else if (actor.isRepeating)
        this._scheduler.add(actor, result);
    }
  }

}
