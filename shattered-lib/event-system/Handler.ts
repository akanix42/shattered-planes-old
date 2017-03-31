import idGenerator from '/generators/idGenerator';
import { serializable, Serializer, Deserializer } from '/lib/jsonc';
import eventTypes from '/event-system/eventTypes';

@serializable('Handler')
export default class Handler {
  constructor(eventType, priority, context, callback) {
    this.eventType = eventType;
    this.priority = priority;
    this.context = context;
    this.callback = callback;
    this.id = idGenerator.generate(Handler.__type__);

    if (arguments.length === 0) return;
    /* Don't call during deserialization */
    this.eventType.addPriority(priority);
  }

  [Serializer.Symbols.Serialize]() {
    const obj = { ...this };
    obj.eventType = obj.eventType.id;
    return obj;
  }

  [Deserializer.Symbols.PostProcess]() {
    this.eventType = eventTypes[eventTypes.eventLookup[this.eventType]];
    this.eventType.addPriority(this.priority);
  }
}
