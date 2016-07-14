import { serializable } from '/lib/jsonc';

@serializable('Event')
export default class Event {
  data = {};
  isCanceled = false;
  actionTime = null;

  constructor(type) {
    this.type = type;
  }

  reset() {
    this.data = null;
    this.isCanceled = false;
    this.actionTime = null;
  }
}
