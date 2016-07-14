import SortedArray from '/lib/SortedArray';
import { serializable } from '/lib/jsonc';

@serializable('EventType')
export default class EventType {
  priorities = new SortedArray;

  constructor(name, id) {
    this.name = name;
    this.id = id;
  }

  addPriority(priority) {
    if (this.priorities.indexOf(priority) === -1)
      this.priorities.push(priority);
  }
}
