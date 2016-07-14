const Benchmark = require('benchmark');
global.require = require;
require('babel-register')({
  babelrc: false,
  plugins: [
    'transform-es2015-destructuring',
    'transform-object-rest-spread',
    'transform-export-extensions',
    'transform-es2015-modules-commonjs',
    'transform-decorators-legacy',
    'syntax-trailing-function-commas',
    'transform-class-properties',
    [
      'babel-root-import',
      {
        'rootPathPrefix': '/'
      }
    ]
  ]
});

const suite = new Benchmark.Suite();

suite
  .add('SubscribedHandlers#remove', function () {
    subscribedHandlers[index++].remove(subscription);
  }, {
    setup: function () {
      // global.require('babel-register');
      const SubscribedHandlers = global.require('../SubscribedHandlers').default;
      const subscribedHandlers = [];

      const subscription = { eventName: 'test', component: { id: 0 }, priority: 0 };
      for (let i = 0; i < 400000; i++) {
        let handlers = new SubscribedHandlers();
        handlers.add(subscription);
        subscribedHandlers.push(handlers);
      }
      let index = 0;
    }
  })
  .add('SubscribedHandlers2#remove', function () {
    subscribedHandlers[index++].remove(subscription);
  }, {
    setup: function () {
      const SubscribedHandlers = global.require('../SubscribedHandlers2').default;
      const subscribedHandlers = [];

      const subscription = { eventName: 'test', component: { id: 0 }, priority: 0 };
      for (var i = 0; i < 400000; i++) {
        let handlers = new SubscribedHandlers();
        handlers.add(subscription);
        subscribedHandlers.push(handlers);
      }
      let index = 0;
    }
  })
  .add('PrioritizedHandlers#remove', function () {
    prioritizedHandlers[index++].remove(handler);
  }, {
    setup: function () {
      const PrioritizedHandlers = global.require('../event-system/PrioritizedHandlers').default;
      const eventTypes = global.require('../event-system/eventTypes').default;
      const eventPriorities = global.require('../event-system/eventTypes').eventPriorities;
      const Handler = global.require('../event-system/Handler').default;

      const handler = new Handler(eventTypes.test, eventPriorities.BEFORE, { id: 0 });
      const prioritizedHandlers = [];
      for (var i = 0; i < 400000; i++) {
        let handlers = new PrioritizedHandlers();
        handlers.add(handler);
        prioritizedHandlers.push(handlers);
      }
      let index = 0;
    }
  })
  // add listeners
  .on('cycle', function (event) {
    console.log(String(event.target), event.target.error || '');
  })
  .on('complete', function () {
    // console.dir(this)
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  });

suite.run({ 'async': true });

//
// .add('SubscribedHandlers#remove 1 of 11', function () {
//   subscribedHandlers.add(subscription);
//   subscribedHandlers.remove(subscription);
// }, {
//   setup: function () {
//     const SubscribedHandlers = global.require('../SubscribedHandlers').default;
//     const subscribedHandlers = new SubscribedHandlers();
//     let j = 0;
//
//     function addEvents() {
//       for (var i = 0; i < 5; i++)
//         subscribedHandlers.add({ eventName: 'event' + i, component: { id: 0 }, priority: j++ });
//     }
//
//     addEvents();
//     const subscription = { eventName: 'event', component: { id: 0 }, priority: 5 };
//     subscribedHandlers.add(subscription);
//     addEvents();
//   }
// })
