import ROT from 'rot-js';
const options = {
  width: 40,
  height: 40,
  fontSize: 18,
  fontFamily: 'Nova Square'
  forceSquareRatio: true,
};

const display = new ROT.Display(options);

export default display;

export {createDisplay};

function createDisplay(additionalOptions = {}) {
  return new ROT.Display({...options, ...additionalOptions});
}
