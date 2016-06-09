import Component from 'shattered-lib/Component';
import events from '/events';

class MoveComponent extends Component {
  constructor() {
    super();
    this.addHandler(events.move, 100, this.move.bind(this));
  }

  move(event) {
    this.entity.tile = event.destination;
  }
}

export default MoveComponent;
