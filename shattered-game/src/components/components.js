
import CollideComponent from './CollideComponent.js';
import CollideComponent_tests from './CollideComponent.tests.js';
import NormalMovementComponent from './NormalMovementComponent.js';
import NormalMovementComponent_tests from './NormalMovementComponent.tests.js';
import PositionComponent from './PositionComponent.js';
import PositionComponent_tests from './PositionComponent.tests.js';

const importRegistrations = {};
importRegistrations[CollideComponent.name] = CollideComponent;
importRegistrations[CollideComponent_tests.name] = CollideComponent_tests;
importRegistrations[NormalMovementComponent.name] = NormalMovementComponent;
importRegistrations[NormalMovementComponent_tests.name] = NormalMovementComponent_tests;
importRegistrations[PositionComponent.name] = PositionComponent;
importRegistrations[PositionComponent_tests.name] = PositionComponent_tests;

export default importRegistrations;
  