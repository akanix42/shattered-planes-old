'use strict';
import {serializable} from 'jsonc';
import Component from 'shattered-lib/Component';
import events from '/events';

@serializable('OccupantComponent')
class OccupantComponent extends Component {
  constructor() {
    super();
    this.addHandler(events.move, 100, this.onPosition);
  }

  onPosition(event) {
    if (this.entity.tile)
      this.entity.tile.removeOccupant(this.entity);
    if (event.destination)
      event.destination.addOccupant(this.entity);
  }
}
OccupantComponent._name = 'occupant';

export default OccupantComponent;
