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
    const actionTime = this._calculateActionTime();
    this.entity.emit({name: events.position, destination: event.destination});
    return actionTime;
  }

  _calculateActionTime(){
    const speed = this.entity.attributes.moveSpeed.current;
    return speed;
  }
}

export default NormalMovementComponent;
