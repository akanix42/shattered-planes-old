import UIObserverComponent from './UIObserverComponent';
import uiObservers from '/uiObservers';

import chai from 'chai';
const expect = chai.expect;

describe('UIObserverComponent', ()=> {
  describe('constructor', () => {
    it(`should add itself to the uiObservers`, () => {
      uiObservers.observers = [];
      const component = new UIObserverComponent();
      expect(uiObservers.observers[0]).to.equal(component);
    });
  });
});
