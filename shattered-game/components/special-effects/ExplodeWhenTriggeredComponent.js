'use strict';
import Component from 'shattered-lib/Component';
import { serializable } from 'shattered-lib/lib/jsonc';

@serializable('ExplodeWhenTriggeredComponent')
export default class ExplodeWhenTriggeredComponent extends Component {

  constructor(game, options = {}) {
    super(game);

    this.explosion = options.explosion;
    if (options.triggers)
      options.triggers.forEach(trigger=> this.addHandler(trigger.eventType, trigger.priority, this.explode));

  }

  explode() {
    this.game.entityGenerator.generate(this.explosion);
  }

}

ExplodeWhenTriggeredComponent._name = 'explodeWhenTriggered';
