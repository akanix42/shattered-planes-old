import { ROT } from 'meteor/nathantreid:rot.js';
const options = {
  width: 40,
  height: 40,
  fontSize: 18,
  forceSquareRatio:true,
  fontFamily: 'Nova Square'
};

const display = new ROT.Display(options);

export default display;