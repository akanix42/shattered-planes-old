import idGenerator from 'generators/idGenerator';
import { serializable, Serializer, Deserializer, ISerializable } from 'jcson';
import eventTypes from 'event-system/eventTypes';
import EventType from "event-system/EventType";

@serializable('Handler')
export default class Handler {
  id: number;

  constructor(public eventType: EventType, public priority: number, public context: any, public callback: Function) {
    this.id = idGenerator.generate();//(Handler as ISerializable).__type__);
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
