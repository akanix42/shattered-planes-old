import { createDisplay} from '../display';
import Screen from './Screen';
import Box from '../ascii-art/Box';
import Point from 'shattered-lib/Point';

class SomeDrawingsScreen extends Screen {
  _display = createDisplay();
  render() {
    this._display.drawText(5, 2, 'Welcome to the Shattered Realms');
    this._display.drawText(5, 6, 'Press [Enter]┐ to start!');
    const box = new Box(this._display);
    box.drawDouble(new Point(3,3), new Point(8,20));
  }
}

export default new SomeDrawingsScreen();
