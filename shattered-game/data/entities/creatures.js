'use strict';
import components from '../../components/index';

const data =
  [
    {
      name: 'munchkin',
      character: 'm',
      color: 'brown',
      components: [
        components.collision,
        components.normalMovement,
        components.occupant,
        components.vision,
        components.testAutomatedActor,
      ],
      attributes: {
        'moveSpeed': 500
      }
    },
    {
      name: 'player',
      character: '@',
      color: 'white',
      components: [
        components.collision,
        components.normalMovement,
        components.occupant,
        components.uiVision,
        components.testAutomatedActor,
      ],
      attributes: {
        'moveSpeed': 1000,
        'visionRange': 20
      }
    }
  ];

data.__type__ = 'creatures';

export default data;
