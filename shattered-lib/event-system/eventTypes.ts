'use strict';
import EventType from './EventType';

const eventTypes = {};
let id = 1;
eventTypes.getNextId = function getNextId() {
  return id++;
};
eventTypes.test = new EventType('test', eventTypes.getNextId());
eventTypes.onEntityAdded = new EventType('onEntityAdded', eventTypes.getNextId());
eventTypes.onEntityRemoved = new EventType('onEntityRemoved', eventTypes.getNextId());

const eventPriorities = {
  BEFORE: 50,
  DURING: 100,
  AFTER: 150
};

eventTypes.priorities = eventPriorities;

export default eventTypes;

export { eventPriorities };
