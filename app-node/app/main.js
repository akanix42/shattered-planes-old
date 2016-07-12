import GameGenerator from 'shattered-game/GameGenerator';
import events from 'shattered-game/events';
import { postal } from 'shattered-game/global';

let game;
let firstTurnAt = 0;
postal.subscribe({
  channel: 'ui',
  topic: 'turn.update',
  callback: (data)=> {
    if (data.turn === 1) {
      firstTurnAt = process.hrtime();
    }

    if (data.turn === 500) {
      let end = process.hrtime(firstTurnAt);
      let diff = (end[0] * 1000) + (end[1] / 1000000);
      console.log(`Game Complete. Avg TPS: ${calculateTPS(diff, data.turn)}`);
      game.engine.lock();
    }

  }
});

game = newGameCommand();


function calculateTPS(diff, turns) {
  const tps = 1000 / (diff / turns);
  let turnsPerSecond = tps.toFixed(2);
  return turnsPerSecond;
}

function newGameCommand() {
  const gameGenerator = new GameGenerator();
  const options = {
    width: 60,
    height: 60,
    numberOfMonsters: 1800
  };
  const game = gameGenerator.generate({
    numberOfLevels: 1,
    testLevel: options
  });

  const player = game.entityGenerator.generateByName('player');

  player.emit({ name: events.onPosition, destination: game.levels[1].getTileAt({ x: 0, y: 0 }) });

  game.start();
}
