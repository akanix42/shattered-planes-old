'use strict';
import {serializable} from 'jsonc';
import Component from 'shattered-lib/Component';

@serializable('ActorComponent')
class ActorComponent extends Component {
  constructor(game) {
    super(game);
  }

  init() {
    this.game.engine.add(this);
  }
}

ActorComponent._name = 'actor';

export default ActorComponent;
