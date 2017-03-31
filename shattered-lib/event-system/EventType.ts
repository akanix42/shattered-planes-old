import SortedArray from 'lib/SortedArray';
import {serializable} from 'jcson';

@serializable('EventType')
export default class EventType {
  priorities = new SortedArray<number>();

  constructor(public name: string, public id: number) { }

  addPriority(priority: number) {
    if (this.priorities.indexOf(priority) === -1)
      this.priorities.push(priority);
  }
}
