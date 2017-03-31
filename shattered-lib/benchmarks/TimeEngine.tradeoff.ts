var perfy = require('perfy');

require('babel-register')({
  babelrc: false,
  "plugins": [
    "transform-es2015-destructuring",
    "transform-object-rest-spread",
    "transform-export-extensions",
    "transform-es2015-modules-commonjs",
    "transform-decorators-legacy",
    "syntax-trailing-function-commas",
    "transform-class-properties",
    [
      "babel-root-import",
      {
        "rootPathPrefix": "/",
        "rootPathSuffix": "../"
      }
    ]
  ]
});

let results = {
  'TimeEngine#add': [],
  'ActionEngine#add': [],
  'TimeEngine#unlock': [],
  'ActionEngine#unlock': [],
};
let isSilentMode = true;
// function end(label) {
//   let time = perfy.end(label).time;
//   if (!isSilentMode)
//   console.log(label, time);
// }
function end(label) {
  let time = perfy.end(label).time;
  if (!isSilentMode)
    results[label].push(time);
}

function start(label) {
  // if (!isSilentMode)
  //   console.log(label, 'start');
  perfy.start(label);
}

const actionActors = [];
const timeActors = [];
let actionActions = 0;
let timeActions = 0;
class ActionActor {
  constructor(index) {
    this.index = index;
    this.actionCount = 0;
  }

  act() {
    actionActions++;
    this.actionCount++;
    return 500;
  }
}

class TimeActor {
  constructor(index) {
    this.index = index;
    this.actionCount = 0;
    this.isRepeating = true;
  }

  act() {
    timeActions++;
    this.actionCount++;
    return 500;
  }
}
for (let i = 0; i < 1800; i++) {
  actionActors.push(new ActionActor(i));
  timeActors.push(new TimeActor(i));
}
const TimeEngine = require('../rot/TimeEngine').default;
const ActionEngine = require('../rot/ActionEngine').default;
const numberOfTurns = 2;

const maxNumberOfRuns = 5;
let numberOfRuns = 0;
let actionEngine = loadActionEngine();
let timeEngine = loadTimeEngine();
runActionEngine(actionEngine);
// runTimeEngine(timeEngine);
isSilentMode = false;
// runBenchmarks();

function quickResults() {
  console.log('Action Actions', actionActions);
  console.log('Time Actions', timeActions);
  actionEngine._scheduler._queue.add(actionEngine._scheduler._current, actionEngine._scheduler._duration || actionEngine._scheduler._defaultDuration);
  console.log(actionEngine._scheduler._queue._events.length);
  console.log(timeEngine._scheduler._queue._queue.length);

  // let actionItems = actionEngine._scheduler._queue._events.map(item=>item.actionCount);
  let actionItems = actionEngine._scheduler._queue._eventTimes.map(item=>item);
  // let timeItems = timeEngine._scheduler._queue._queue.map(element=>element.item.actionCount);
  let timeItems = timeEngine._scheduler._queue._queue.map(element=>element.time);
  for (var i = 0; i < actionItems.length; i++) {
    if (actionItems[i] !== timeItems[i]) {
      console.dir(actionItems[i]);
      console.dir(timeItems[i]);
      console.dir(actionEngine._scheduler._queue._events[i]);
      console.dir(timeEngine._scheduler._queue._queue[i]);
      break;
    }
  }
  console.log('turn', timeEngine.turn);
  // console.log(actionItems, timeItems);
}
function runBenchmarks() {
  setTimeout(function () {
    if (numberOfRuns / 2 % 0) {
      runActionEngine(loadActionEngine());
      runTimeEngine(loadTimeEngine());
    } else {
      runActionEngine(loadActionEngine());
      runTimeEngine(loadTimeEngine());
    }
    numberOfRuns++;
    if (numberOfRuns === maxNumberOfRuns)
      return showResults();
    runBenchmarks();
  }, 50);
}

function showResults() {
  const averages = {};
  for (let key in results)
    averages[key] = calculateAverage(results[key]);

  function calculateAverage(array) {
    return array.reduce((sum, value)=> sum + value, 0) / array.length;
  }

  console.log('\nResults');
  console.dir(results);
  console.log('\nAverages');
  console.dir(averages);
  console.log('\nAction Actions', actionActions);
  console.log('\nTime Actions', timeActions);
}
function loadActionEngine() {
  const actionEngine = new ActionEngine;
  let turn = 0;
  start('ActionEngine#add');
  for (let i = 0; i < actionActors.length; i++)
    actionEngine.add(actionActors[i], true, 500);
  actionEngine.add({
    timekeeper: 'timekeeper',
    act() {
      console.log('a')
      ++turn;
      return new Promise((resolve)=> {
        timeEngine.unlock();
        resolve(1000);
        if (turn === numberOfTurns)
          setTimeout(quickResults);

      });
    }
  }, true, 1000);
  end('ActionEngine#add');
  return actionEngine;
}

function loadTimeEngine() {
  const timeEngine = new TimeEngine;
  let turn = 0;
  start('TimeEngine#add');
  for (let i = 0; i < timeActors.length; i++)
    timeEngine.add(timeActors[i], 500);
  timeEngine.add({
    timekeeper: 'timekeeper',
    act() {
      console.log('b')
      timeEngine.lock();
      if (++turn === numberOfTurns) {
        actionEngine.lock();
        console.log('done')

        return 1000;
      }
      return 1000;
    },
    isRepeating: true
  }, 1000);
  end('TimeEngine#add');
  return timeEngine;
}

function runTimeEngine(engine) {
  start('TimeEngine#unlock');
  engine.unlock();
  end('TimeEngine#unlock');
  return engine;
}

function runActionEngine(engine) {
  start('ActionEngine#unlock');
  engine.unlock();
  end('ActionEngine#unlock');
  return engine;
}
