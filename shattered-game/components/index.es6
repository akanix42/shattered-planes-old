
'use strict';
import ArchitectureComponent from './ArchitectureComponent';
import CollisionComponent from './CollisionComponent';
import NormalMovementComponent from './NormalMovementComponent';
import OccupantComponent from './OccupantComponent';
import TestAutomatedActorComponent from './TestAutomatedActorComponent';

const importRegistrations = {};
importRegistrations[ArchitectureComponent._name||ArchitectureComponent.__type__] = ArchitectureComponent;
importRegistrations[CollisionComponent._name||CollisionComponent.__type__] = CollisionComponent;
importRegistrations[NormalMovementComponent._name||NormalMovementComponent.__type__] = NormalMovementComponent;
importRegistrations[OccupantComponent._name||OccupantComponent.__type__] = OccupantComponent;
importRegistrations[TestAutomatedActorComponent._name||TestAutomatedActorComponent.__type__] = TestAutomatedActorComponent;

export default importRegistrations;
  