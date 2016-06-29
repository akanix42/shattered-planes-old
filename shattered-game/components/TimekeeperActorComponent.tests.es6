import TimekeeperActorComponent from './TimekeeperActorComponent';
import global, {postal} from '/global';

import chai from 'chai';
const expect = chai.expect;
describe('TimekeeperActorComponent', ()=> {
  describe('constructor', () => {
    it(`should set the timekeeper's timeout`, () => {
      const timekeeperComponent = new TimekeeperActorComponent(5);
      timekeeperComponent._timeout = 5;
    });
  });

  describe('act', () => {
    it('should increment the turn number', (done) => {
      const timekeeperComponent = new TimekeeperActorComponent({engine: {add(){}}});
      expect(timekeeperComponent._turnNumber).to.equal(0);
      timekeeperComponent.act().then(()=> {
        expect(timekeeperComponent._turnNumber).to.equal(1);
        done();
      });
    });

    it('should publish the updated turn number', (done) => {
      postal.subscribe({
        channel: 'ui',
        topic: 'turn.update',
        callback: (data)=> {
          expect(data.turn).to.equal(1);
          done();
        }
      });

      const timekeeperComponent = new TimekeeperActorComponent(5);
      timekeeperComponent.act();
    });
  });
});
