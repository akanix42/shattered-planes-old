import Component from 'shattered-lib/Component';
import events from '/events';

class CollideComponent extends Component {
  constructor() {
    super();
    this.addHandler(events.move, 50, this.move.bind(this));
  }

  move(event) {
    return event.destination.emit({name: events.willCollide, entity});
  }
}

export default CollideComponent;
