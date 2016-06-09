
import CollideComponent from './CollideComponent.js';
import MoveComponent from './MoveComponent.js';

const importRegistrations = {};
importRegistrations[CollideComponent.name] = CollideComponent;
importRegistrations[MoveComponent.name] = MoveComponent;

export default importRegistrations;
  