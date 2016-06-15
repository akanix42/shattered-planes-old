
'use strict';
import ArchitectureComponent from './ArchitectureComponent.js';
import CollisionComponent from './CollisionComponent.js';
import NormalMovementComponent from './NormalMovementComponent.js';
import PositionComponent from './PositionComponent.js';

const importRegistrations = {};
importRegistrations[ArchitectureComponent._name||ArchitectureComponent.__type__] = ArchitectureComponent;
importRegistrations[CollisionComponent._name||CollisionComponent.__type__] = CollisionComponent;
importRegistrations[NormalMovementComponent._name||NormalMovementComponent.__type__] = NormalMovementComponent;
importRegistrations[PositionComponent._name||PositionComponent.__type__] = PositionComponent;

export default importRegistrations;
  