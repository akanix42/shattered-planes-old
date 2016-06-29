'use strict';
import {serializable} from 'jsonc';
import Component from 'shattered-lib/Component';
import events from '/events';

@serializable('OccupantComponent')
class OccupantComponent extends Component {
  constructor(game) {
    super(game);
    this.addHandler(events.onPosition, 100, this.onPositionChanged);
  }

  onPositionChanged(event) {
    if (this.entity.tile)
      this.entity.tile.removeOccupant(this.entity);

    if (event.destination)
      event.destination.addOccupant(this.entity);
  }
}
OccupantComponent._name = 'occupant';

export default OccupantComponent;
