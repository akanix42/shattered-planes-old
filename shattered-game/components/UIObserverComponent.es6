'use strict';
import {serializable} from 'jsonc';
import Component from 'shattered-lib/Component';
import uiObservers from '/uiObservers';
import events from '/events';
import postal from 'postal';

@serializable('UIObserverComponent')
class UIObserverComponent extends Component {
  constructor() {
    super();
    // uiObservers.add(this);
    this.addHandler(events.see, this.onSee, 150);
  }

  onSee(event) {
    postal.publish({
      channel: 'ui',
      topic: events.see,
      data: event
    });
  }
}
UIObserverComponent._name = 'uiObserver';

export default UIObserverComponent;
