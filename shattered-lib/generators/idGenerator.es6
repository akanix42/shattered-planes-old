/**
 * The IdGenerator generates incremental numeric ID's. When a new game starts or before a game is loaded,
 * the idGenerator should be reset.
 */
'use strict';
import {serializable} from 'shattered-lib/lib/jsonc';

@serializable('IdGenerator')
class IdGenerator {
  _nextId = 1;

  generate() {
    return this._nextId++;
  }

  reset(value = 1) {
    this._nextId = value;
  }
}

export default new IdGenerator();
