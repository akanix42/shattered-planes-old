'use strict';
import Component from 'shattered-lib/Component';
import {serializable} from 'shattered-lib/lib/jsonc';

@serializable('ActorComponent')
export default class ActorComponent extends Component {
  constructor(game) {
    super(game);
  }

  init() {
    this.game.engine.add(this);
  }
}

ActorComponent._name = 'actor';
