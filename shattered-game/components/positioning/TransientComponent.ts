'use strict';
import {serializable} from 'shattered-lib/lib/jsonc';
import Component from 'shattered-lib/Component';
import events from '/eventTypes';

@serializable('TransientComponent')
class TransientComponent extends Component {
  constructor(game) {
    super(game);
    this.addHandler(events.onPosition, events.priorities.DURING, this.onPositionChanged);
  }

  onPositionChanged(event) {
    if (this.entity.tile)
      this.entity.tile.removeTransient(this.entity);

    if (event.data.destination)
      event.data.destination.addTransient(this.entity);
  }
}
TransientComponent._name = 'transient';

export default TransientComponent;
