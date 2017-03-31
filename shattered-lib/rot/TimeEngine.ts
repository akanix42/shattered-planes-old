/**
 * Adapted from ROT.Engine
 */
'use strict';
import { serializable } from '/lib/jsonc';
import TimeScheduler from './TimeScheduler';

@serializable('TimeEngine')
export default class TimeEngine {
  _scheduler = new TimeScheduler;
  _lock = 1;

  get turn() {
    return this._scheduler.turn;
  }

  add(actor, time) {
    this._scheduler.add(actor, time);
  }

  remove(actor) {
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
          .then(time=> {
            if (actor.isRepeating) this._scheduler.add(actor, time);
          })
          .then(this.unlock.bind(this));
      } else if (actor.isRepeating)
        this._scheduler.add(actor, result);
    }
  }

}
