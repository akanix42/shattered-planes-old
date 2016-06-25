import postal from 'postal';

class UIObservers {
  observers = [];

  add(observer) {
    this.observers.push(observer);
  }

}


export default new UIObservers();
