
'use strict';
import ArchitectureComponent from './ArchitectureComponent';
import CollisionComponent from './CollisionComponent';
import NormalMovementComponent from './NormalMovementComponent';
import OccupantComponent from './OccupantComponent';
import TestAutomatedActorComponent from './TestAutomatedActorComponent';
import TimekeeperActorComponent from './TimekeeperActorComponent';
import UIVisionComponent from './UIVisionComponent';
import VisionComponent from './VisionComponent';

const importRegistrations = {};
importRegistrations.architecture = ArchitectureComponent;
importRegistrations.collision = CollisionComponent;
importRegistrations.normalMovement = NormalMovementComponent;
importRegistrations.occupant = OccupantComponent;
importRegistrations.testAutomatedActor = TestAutomatedActorComponent;
importRegistrations.timekeeperActor = TimekeeperActorComponent;
importRegistrations.uiVision = UIVisionComponent;
importRegistrations.vision = VisionComponent;

export default importRegistrations;
  