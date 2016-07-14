import idGenerator from '/generators/idGenerator';
import { serializable } from '/lib/jsonc';

@serializable('Handler')
export default class Handler {
  constructor(eventType, priority, context, callback) {
    if (arguments.length === 0)
      return;

    this.eventType = eventType;
    this.priority = priority;
    this.eventType.addPriority(priority);
    this.context = context;
    this.callback = callback;
    this.id = idGenerator.generate(Handler.__type__);
  }
}
