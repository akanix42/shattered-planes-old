'use strict';
import {serializable} from 'jsonc';
import Component from 'shattered-lib/Component';
import events from '/events';

@serializable('NormalMovementComponent')
class NormalMovementComponent extends Component {
  constructor() {
    super();
    this.addHandler(events.move, 100, this.onMove);
  }

  onMove(event) {
    const actionTime = calculateActionTime();
    this.entity.emit({name: events.position, destination: event.destination});
    return actionTime;
  }
}

export default NormalMovementComponent;

function calculateActionTime(){
  const speed = this.entity.stats.moveSpeed;
  return speed;
}
