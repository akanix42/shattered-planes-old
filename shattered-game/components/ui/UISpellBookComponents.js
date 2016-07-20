import Component from 'shattered-lib/Component';
import { postal } from '/global';
import { serializable } from 'shattered-lib/lib/jsonc';
import components from '/components/index';
import events from '/eventTypes';

@serializable('UISpellBookComponent')
export default class UISpellBookComponent extends Component {
  spells = [
    {
      name: 'fireball',
      template: {
        character: '~',
        color: 'red',
        components: []
      }
    }

  ];

  constructor(game) {
    super(game);

    postal.subscribe({
      topic: 'game.query.spells',
      callback: ()=>this._sendSpellList()
    });
  }

  _sendSpellList() {
    postal.publish({
      topic: 'ui.spells.list',
      data: this.spells
    });
  }

  cast(spell) {
    let point = this.entity.tile.point;
    let level = this.entity.tile.level;

    spell.components.push([components.generateWhenTriggered, { triggers: [events.onTargetReached] }]);
    spell.components.push([components.directionalActor, { x: 1, y: 0, moveTime: 100 }]);
    spell.components.push([components.targetTile, { tile: level.getTileAtXY(point.x + 5, point.y) }]);
    this.game.entityGenerator.generate(spell);
  }
}
UISpellBookComponent._name = 'uiSpellBook';
