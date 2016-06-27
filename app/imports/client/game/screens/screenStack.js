"use strict";

class ScreenStack {
  stack = [];

  constructor(){
    window.screenStack = this;

  }

  get currentScreen() {
    var stack = this.stack;
    return stack[stack.length - 1];
  }

  push(screen) {
    this.stack.push(screen);
    screen.render();
  }

  pop() {
    var screen = this.stack.pop();
    screen.hide();
    this.currentScreen().render();
  }

  remove(screen) {
    const index = this.stack.indexOf(screen);
    if (index === -1) return;

    this.stack.splice(index, 1);
  }

  clear() {
    this.stack = [];
  }

}

export default new ScreenStack();
