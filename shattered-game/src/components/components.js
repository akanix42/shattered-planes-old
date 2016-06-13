
import CollideComponent from './CollideComponent.js';
import NormalMovementComponent from './NormalMovementComponent.js';
import CollideComponent_tests from './CollideComponent.tests.js';
import PositionComponent from './PositionComponent.js';
import NormalMovementComponent_tests from './NormalMovementComponent.tests.js';
import PositionComponent_tests from './PositionComponent.tests.js';

const importRegistrations = {};
importRegistrations[CollideComponent.name] = CollideComponent;
importRegistrations[NormalMovementComponent.name] = NormalMovementComponent;
importRegistrations[CollideComponent_tests.name] = CollideComponent_tests;
importRegistrations[PositionComponent.name] = PositionComponent;
importRegistrations[NormalMovementComponent_tests.name] = NormalMovementComponent_tests;
importRegistrations[PositionComponent_tests.name] = PositionComponent_tests;

export default importRegistrations;
  