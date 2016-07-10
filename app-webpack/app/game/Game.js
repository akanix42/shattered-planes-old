import React from 'react';
import styles from './game.scss';
import ScreenContainer from './ScreenContainer';
import { postal } from 'shattered-game/global';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      turn: 0,
      turnsPerSecond: 0,
      width: 10,
      height: 10,
      numberOfCreatures: null,
    };
  }

  getNumberOfCreatures() {
    return this.state.numberOfCreatures === null
      ? this.state.width * this.state.height / 2
      : this.state.numberOfCreatures;
  }

  updateMainMenuOptions() {
    postal.publish({
      channel: 'ui',
      topic: 'mainMenu',
      data: {
        numberOfCreatures: parseInt(this.getNumberOfCreatures()),
        width: parseInt(this.state.width),
        height: parseInt(this.state.height)
      }
    });
  }

  render() {
    return (
      <div>
        <div className={styles.turnNumber}>
          Turn: {this.state.turn} | TPS: {this.state.turnsPerSecond}
        </div>
        <div>
          <label>width<input type="text" value={this.state.width} onChange={this._setWidthOrHeight('width')}/></label>
          <label>height<input type="text" value={this.state.height}
                              onChange={this._setWidthOrHeight('height')}/></label>
          <label>number of creatures<input type="text" value={this.getNumberOfCreatures()}
                                           onChange={this._setValue('numberOfCreatures')}/></label>
        </div>
        <ScreenContainer updateTPS={this.updateTPS.bind(this)}/>
        {this.updateMainMenuOptions()}
      </div>
    );
  }

  _setWidthOrHeight(key) {
    const setValue = this._setValue(key);
    return event => {
      this.setState({ numberOfCreatures: null });
      setValue(event);
    }
  }

  _setValue(key) {
    return event=>this.setState({ [key]: event.target.value });
  }

  updateTPS(data) {
    this.setState(data);
  }
}
