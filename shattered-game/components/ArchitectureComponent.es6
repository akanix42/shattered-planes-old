'use strict';
import {serializable, include} from 'shattered-lib/lib/jsonc';
import Component from 'shattered-lib/Component';
import events from '/events';

@serializable('ArchitectureComponent')
class ArchitectureComponent extends Component {
  constructor(game) {
    super(game);
    this.addHandler(events.onPosition, 150, this.onPosition);
  }

  @include
  onPosition(event) {
    if (event.destination === this.entity.tile)
      return;

    const previousTile = this.entity.tile;
    if (previousTile && previousTile.architecture === this.entity)
      previousTile.architecture = null;

    if (event.destination)
      event.destination.architecture = this.entity;
  }
}

ArchitectureComponent._name = 'architecture';

export default ArchitectureComponent;
