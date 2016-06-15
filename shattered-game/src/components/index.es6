
'use strict';
import ArchitectureComponent from './ArchitectureComponent.js';
import CollisionComponent from './CollisionComponent.js';
import NormalMovementComponent from './NormalMovementComponent.js';
import OccupantComponent from './OccupantComponent.js';

const importRegistrations = {};
importRegistrations[ArchitectureComponent._name||ArchitectureComponent.__type__] = ArchitectureComponent;
importRegistrations[CollisionComponent._name||CollisionComponent.__type__] = CollisionComponent;
importRegistrations[NormalMovementComponent._name||NormalMovementComponent.__type__] = NormalMovementComponent;
importRegistrations[OccupantComponent._name||OccupantComponent.__type__] = OccupantComponent;

export default importRegistrations;
  