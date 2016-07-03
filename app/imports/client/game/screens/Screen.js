import screenStack from './screenStack';

export default class Screen {
  screenStack = screenStack;

  show() {
    this.screenStack.container.append(this._display.getContainer());
    this.screenStack.push(this);
  }

  hide() {
    this.screenStack.pop(this);
  }

  render() {
  }

  handleInput() {

  }
}
