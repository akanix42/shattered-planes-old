'use strict';
import Component from 'shattered-lib/Component';
import { serializable } from 'shattered-lib/lib/jsonc';
import events from '/eventTypes';
import Event from 'shattered-lib/event-system/Event';

@serializable('TargetTileComponent')
export default class TargetTileComponent extends Component {

  constructor(game, options = {}) {
    super(game);

    this.target = options.target;
    this.addHandler(events.onPosition, events.priorities.AFTER, this.onPositionChanged);
  }

  onPositionChanged(event) {
    if (!event.data.destination) return;

    if (this.target === event.data.destination) {
      let event = new Event(events.onTargetReached);
      this.entity.emit(event);
    }
  }

}

TargetTileComponent._name = 'targetTile';
