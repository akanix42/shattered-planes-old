/**
 * Adapted from ROT.Engine
 */
'use strict';
import ROT from 'rot-js';

class Engine {
  _scheduler = new ROT.Scheduler.Action();
  _lock = 1;

  add(actor, isRecurring=true) {
    this._scheduler.add(actor, isRecurring);
  }
  
  remove(actor) {
    this._scheduler.remove(actor);
  }

  lock() {
    this._lock++;
  }

  unlock() {
    if (!this._lock) { throw new Error("Cannot unlock unlocked engine"); }
    this._lock--;

    while (!this._lock) {
      const actor = this._scheduler.next();
      if (!actor) { return this.lock(); } /* no actors */
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

export default Engine;
