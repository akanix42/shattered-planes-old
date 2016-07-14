'use strict';
import {serializable} from 'shattered-lib/lib/jsonc';
import Component from 'shattered-lib/Component';
import events from '/eventTypes';

@serializable('OccupantComponent')
class OccupantComponent extends Component {
  constructor(game) {
    super(game);
    this.addHandler(events.onPosition, events.priorities.DURING, this.onPositionChanged);
  }

  onPositionChanged(event) {
    if (this.entity.tile)
      this.entity.tile.removeOccupant(this.entity);

    if (event.data.destination)
      event.data.destination.addOccupant(this.entity);
  }
}
OccupantComponent._name = 'occupant';

export default OccupantComponent;
