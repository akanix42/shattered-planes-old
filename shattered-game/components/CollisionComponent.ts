'use strict';
import {serializable} from 'shattered-lib/lib/jsonc';
import Component from 'shattered-lib/Component';
import events from '/eventTypes';
import Event from 'shattered-lib/event-system/Event';

@serializable('CollisionComponent')
class CollisionComponent extends Component {
  constructor(game) {
    super(game);
    this.addHandler(events.onPosition, events.priorities.BEFORE, this.onPosition);
    this.addHandler(events.willNotCollide, events.priorities.BEFORE, this.onWillNotCollide);
  }
  
  onPosition(positionEvent) {
    const collisionEvent = new Event(events.willNotCollide);
    collisionEvent.data.entity = this.entity;

    positionEvent.isCanceled = positionEvent.data.destination.emit(collisionEvent).isCanceled;
  }

  onWillNotCollide() {
    return false;
  }
}

CollisionComponent._name = 'collision';

export default CollisionComponent;
