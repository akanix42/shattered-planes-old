import unicodeCharacters from './unicodeCharacterMap';

class Box {
  constructor(display) {
    this.display = display;
  }

  drawSingle() {

  }

  drawDouble(point1, point2) {
    // this.display.draw(point1.x, point1.y, unicodeCharacters.boxDoubleDownAndRight);
    // this.display.draw(point2.x, point1.y, unicodeCharacters.boxDoubleDownAndLeft);
    this.display.draw(point1.x, point2.y, unicodeCharacters.boxDoubleUpAndRight);
    this.display.draw(point2.x, point2.y, unicodeCharacters.boxDoubleUpAndLeft);

    const innerWidth = point2.x - point1.x - 1;
    const horizontalLine = new Array(innerWidth*2).fill(unicodeCharacters.boxDoubleHorizontal).join('');
    const top = `${unicodeCharacters.boxDoubleDownAndRight}${horizontalLine}${unicodeCharacters.boxDoubleDownAndLeft}`;
    this.display.draw(point1.x, point1.y, top);
    this.display.draw(point1.x + 2, point2.y, new Array(innerWidth).fill(unicodeCharacters.boxDoubleHorizontal).join(''));
    // for (let x = point1.x + 1; x < point2.x; x++) {
    //   this.display.draw(x, point2.y, unicodeCharacters.boxDoubleHorizontal);
    // }
    for (let y = point1.y + 1; y < point2.y; y++) {
      this.display.draw(point1.x, y, unicodeCharacters.boxDoubleVertical);
      this.display.draw(point2.x, y, unicodeCharacters.boxDoubleVertical);
    }
  }
}

export default Box;
