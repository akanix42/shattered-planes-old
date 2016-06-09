'use strict';
import {serializable} from 'jsonc';
import Component from 'shattered-lib/Component';
import events from '/events';

@serializable('PositionComponent')
class PositionComponent extends Component {
  constructor() {
    super();
    this.addHandler(events.move, 100, this.onPosition);
  }

  onPosition(event) {
    this.entity.tile = event.destination;
  }
}

export default PositionComponent;
