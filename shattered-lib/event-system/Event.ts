import { serializable } from 'jcson';
import EventType from './EventType';

@serializable('Event')
export default class Event {
  data: any = {};
  isCanceled = false;
  actionTime = null;

  constructor(public type: EventType) { }

  reset() {
    this.data = null;
    this.isCanceled = false;
    this.actionTime = null;
  }
}
