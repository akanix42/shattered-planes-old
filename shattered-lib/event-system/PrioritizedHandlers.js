'use strict';
import { serializable } from '/lib/jsonc';

@serializable('PrioritizedHandlers')
export default class PrioritizedHandlers {
  _handlersByPriority = {};
  _handlersById = {};
  numberOfHandlers = 0;

  add(handler) {
    if (this._handlersById[handler.id] !== undefined)
      return;

    let index = 0;
    let handlersByPriority = this._handlersByPriority;
    let handlers = handlersByPriority[handler.priority];
    if (handlers === undefined) {
      handlersByPriority[handler.priority] = { [handler.eventType.id]: [handler] };
    }
    else {
      let eventHandlers = handlers[handler.eventType.id];
      if (eventHandlers === undefined)
        handlers[handler.eventType.id] = [handler];
      else {
        index = eventHandlers.length;
        eventHandlers.push(handler);
      }
    }
    this._handlersById[handler.id] = index;
    this.numberOfHandlers++;
  }

  addMultiple(handlers) {
    for (var i = 0; i < handlers.length; i++)
      this.add(handlers[i]);
  }

  remove(handler) {
    let index = this._handlersById[handler.id];
    if (index === undefined)
      return;

    let handlersByPriority = this._handlersByPriority;
    let handlers = handlersByPriority[handler.priority];
    let eventHandlers = handlers[handler.eventType.id];

    if (index === 0) eventHandlers.shift();
    else if (index === eventHandlers.length - 1) eventHandlers.pop();
    else eventHandlers.splice(index, 1);
    this._handlersById[handler.id] = undefined;
    this.numberOfHandlers--;
  }

  removeMultiple(handlers) {
    for (var i = 0; i < handlers.length; i++)
      this.remove(handlers[i]);
  }

  emit(event) {
    let length =  event.type.priorities.length;
    for (let i = 0; i < length; i++) {
     this.emitTo(event.type.priorities.get(i), event);
    }
    return event;
  }

  emitTo(priority, event) {
    let eventMap = this._handlersByPriority[priority];
    let handlers;
    if (eventMap === undefined || (handlers = eventMap[event.type.id]) === undefined) return event;

    this._callHandlers(handlers, event);
    if (event.isCanceled)
      return event;
  }

  _callHandlers(handlers, event) {
    for (let j = 0; j < handlers.length; j++) {
      let handler = handlers[j];
      let result = handler.callback.call(handler.context, event);
      if (event.isCanceled)
        return event;
      if (result === false) {
        event.isCanceled = true;
        return event;
      }
    }
  }
}
