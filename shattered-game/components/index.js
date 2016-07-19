
'use strict';
import __CollisionComponent from '././CollisionComponent';
import __NormalMovementComponent from '././NormalMovementComponent';
import __VisionComponent from '././VisionComponent';
import actors_ActorComponent from './actors/ActorComponent';
import actors_DirectionalActorComponent from './actors/DirectionalActorComponent';
import actors_ExplosionActorComponent from './actors/ExplosionActorComponent';
import actors_TestAutomatedActorComponent from './actors/TestAutomatedActorComponent';
import special_effects_ExplodeWhenTriggeredComponent from './special-effects/ExplodeWhenTriggeredComponent';
import positioning_ArchitectureComponent from './positioning/ArchitectureComponent';
import positioning_OccupantComponent from './positioning/OccupantComponent';
import positioning_TransientComponent from './positioning/TransientComponent';
import targeting_TargetTileComponent from './targeting/TargetTileComponent';
import ui_UISpellBookComponents from './ui/UISpellBookComponents';
import ui_UIVisionComponent from './ui/UIVisionComponent';

const importRegistrations = {};
importRegistrations.collision = __CollisionComponent;
importRegistrations.normalMovement = __NormalMovementComponent;
importRegistrations.vision = __VisionComponent;
importRegistrations.actor = actors_ActorComponent;
importRegistrations.directionalActor = actors_DirectionalActorComponent;
importRegistrations.explosionActor = actors_ExplosionActorComponent;
importRegistrations.testAutomatedActor = actors_TestAutomatedActorComponent;
importRegistrations.explodeWhenTriggered = special_effects_ExplodeWhenTriggeredComponent;
importRegistrations.architecture = positioning_ArchitectureComponent;
importRegistrations.occupant = positioning_OccupantComponent;
importRegistrations.transient = positioning_TransientComponent;
importRegistrations.targetTile = targeting_TargetTileComponent;
importRegistrations.uiSpellBook = ui_UISpellBookComponents;
importRegistrations.uiVision = ui_UIVisionComponent;

export default importRegistrations;
  