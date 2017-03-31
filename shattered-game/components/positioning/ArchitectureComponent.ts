'use strict';
import {serializable} from 'shattered-lib/lib/jsonc';
import Component from 'shattered-lib/Component';
import events from '/eventTypes';

@serializable('ArchitectureComponent')
class ArchitectureComponent extends Component {
  constructor(game) {
    super(game);
    this.addHandler(events.onPosition, events.priorities.AFTER, this.onPosition);
  }

  onPosition(event) {
    if (event.data.destination === this.entity.tile)
      return;

    const previousTile = this.entity.tile;
    if (previousTile && previousTile.architecture === this.entity)
      previousTile.architecture = null;

    if (event.data.destination)
      event.data.destination.architecture = this.entity;
  }
}

ArchitectureComponent._name = 'architecture';

export default ArchitectureComponent;
