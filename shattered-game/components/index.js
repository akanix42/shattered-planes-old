
'use strict';
import __CollisionComponent from '././CollisionComponent';
import __NormalMovementComponent from '././NormalMovementComponent';
import __VisionComponent from '././VisionComponent';
import actors_ActorComponent from './actors/ActorComponent';
import actors_ExplosionActorComponent from './actors/ExplosionActorComponent';
import actors_TargetTileActorComponent from './actors/TargetTileActorComponent';
import actors_TestAutomatedActorComponent from './actors/TestAutomatedActorComponent';
import positioning_ArchitectureComponent from './positioning/ArchitectureComponent';
import positioning_OccupantComponent from './positioning/OccupantComponent';
import positioning_TransientComponent from './positioning/TransientComponent';
import special_effects_GenerateWhenTriggeredComponent from './special-effects/GenerateWhenTriggeredComponent';
import targeting_TargetTileComponent from './targeting/TargetTileComponent';
import ui_UISpellBookComponents from './ui/UISpellBookComponents';
import ui_UIVisionComponent from './ui/UIVisionComponent';

const importRegistrations = {};
importRegistrations.collision = __CollisionComponent;
importRegistrations.normalMovement = __NormalMovementComponent;
importRegistrations.vision = __VisionComponent;
importRegistrations.actor = actors_ActorComponent;
importRegistrations.explosionActor = actors_ExplosionActorComponent;
importRegistrations.targetTileActor = actors_TargetTileActorComponent;
importRegistrations.testAutomatedActor = actors_TestAutomatedActorComponent;
importRegistrations.architecture = positioning_ArchitectureComponent;
importRegistrations.occupant = positioning_OccupantComponent;
importRegistrations.transient = positioning_TransientComponent;
importRegistrations.generateWhenTriggered = special_effects_GenerateWhenTriggeredComponent;
importRegistrations.targetTile = targeting_TargetTileComponent;
importRegistrations.uiSpellBook = ui_UISpellBookComponents;
importRegistrations.uiVision = ui_UIVisionComponent;

export default importRegistrations;
  