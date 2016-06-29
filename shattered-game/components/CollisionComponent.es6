'use strict';
import {serializable} from 'jsonc';
import Component from 'shattered-lib/Component';
import events from '/events';

@serializable('CollisionComponent')
class CollisionComponent extends Component {
  constructor(game) {
    super(game);
    this.addHandler(events.onPosition, 50, this.onPosition);
    this.addHandler(events.willNotCollide, 50, this.onWillNotCollide);
  }

  onPosition(event) {
    const result = event.destination.emit({name: events.willNotCollide, entity: this.entity});
    event.isCanceled = result.isCanceled;
  }

  onWillNotCollide() {
    return false;
  }
}

CollisionComponent._name = 'collision';

export default CollisionComponent;
