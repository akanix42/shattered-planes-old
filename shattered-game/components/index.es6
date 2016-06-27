
'use strict';
import ArchitectureComponent from './ArchitectureComponent';
import CollisionComponent from './CollisionComponent';
import NormalMovementComponent from './NormalMovementComponent';
import OccupantComponent from './OccupantComponent';
import TestAutomatedActorComponent from './TestAutomatedActorComponent';
import VisionComponent from './VisionComponent';

const importRegistrations = {};
importRegistrations.architecture = ArchitectureComponent;
importRegistrations.collision = CollisionComponent;
importRegistrations.normalMovement = NormalMovementComponent;
importRegistrations.occupant = OccupantComponent;
importRegistrations.testAutomatedActor = TestAutomatedActorComponent;
importRegistrations.vision = VisionComponent;

export default importRegistrations;
  