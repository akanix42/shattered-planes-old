'use strict';
import {serializable} from 'shattered-lib/jsonc';
import Component from 'shattered-lib/Component';
import events from '/events';

@serializable('NormalMovementComponent')
class NormalMovementComponent extends Component {
  constructor(game) {
    super(game);
    this.addHandler(events.move, 100, this.onMove);
  }

  onMove(event) {
    const actionTime = this._calculateActionTime();
    this.entity.emit({name: events.onPosition, destination: event.destination});
    event.actionTime = actionTime;
  }

  _calculateActionTime(){
    const speed = this.entity.attributes.moveSpeed.current;
    return speed;
  }
}

NormalMovementComponent._name = 'normalMovement';

export default NormalMovementComponent;
