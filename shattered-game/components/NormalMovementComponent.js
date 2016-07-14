'use strict';
import {serializable} from 'shattered-lib/lib/jsonc';
import Component from 'shattered-lib/Component';
import events from '/eventTypes';
import Event from 'shattered-lib/event-system/Event';

@serializable('NormalMovementComponent')
class NormalMovementComponent extends Component {
  constructor(game) {
    super(game);
    this.addHandler(events.move, events.priorities.DURING, this.onMove);
  }

  onMove(moveEvent) {
    const actionTime = this._calculateActionTime();
    const positionEvent = new Event(events.onPosition);
    positionEvent.data.destination = moveEvent.data.destination;
    this.entity.emit(positionEvent);

    moveEvent.actionTime = actionTime;
  }

  _calculateActionTime(){
    const speed = this.entity.attributes.moveSpeed.current;
    return speed;
  }
}

NormalMovementComponent._name = 'normalMovement';

export default NormalMovementComponent;
