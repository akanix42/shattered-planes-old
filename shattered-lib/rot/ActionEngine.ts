/**
 * Adapted from ROT.Engine
 */
'use strict';
import { serializable } from '/lib/jsonc';
import ROT from '/lib/rot-js';

@serializable('ActionEngine')
export default class ActionEngine {
  _scheduler = new ROT.Scheduler.Action();
  _lock = 1;

  add(actor, isRecurring = true, time=0) {
    this._scheduler.add(actor, isRecurring, time);
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
        return this.lock();
      }
      /* no actors */
      const result = actor.act();
      if (result && result.then) { /* actor returned a "thenable", looks like a Promise */
        this.lock();
        result
          .then(duration=>this._scheduler.setDuration(duration))
          .then(this.unlock.bind(this));
      } else
        this._scheduler.setDuration(result);
    }
  }
}
