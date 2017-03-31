'use strict';
import Component from 'shattered-lib/Component';
import { serializable } from 'shattered-lib/lib/jsonc';

@serializable('GenerateWhenTriggeredComponent')
export default class GenerateWhenTriggeredComponent extends Component {

  constructor(game, options = {}) {
    super(game);

    this.template = options.template;
    if (options.triggers)
      options.triggers.forEach(trigger=> this.addHandler(trigger.eventType, trigger.priority, this.generate));

  }

  generate() {
    this.game.entityGenerator.generate(this.template);
  }

}

GenerateWhenTriggeredComponent._name = 'generateWhenTriggered';
