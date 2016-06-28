'use strict';
import components from '../../components/index';

const data =
  [
    {
      name: 'munchkin',
      character: 'm',
      color: 'brown',
      components: []
    },
    {
      name: 'player',
      character: '@',
      color: 'white',
      components: [
        components.normalMovement,
        components.occupant,
        components.uiVision,
        components.testAutomatedActor,
      ],
      attributes: {
        'moveSpeed': 1000,
        'visionRange': 20
      }
    },
  ];

data.__type__ = 'creatures';

export default data;
