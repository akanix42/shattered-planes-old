
'use strict';
import architecture from './architecture.js';
import creatures from './creatures.js';

const importRegistrations = {};
importRegistrations[architecture.__type__] = architecture;
importRegistrations[creatures.__type__] = creatures;

export default importRegistrations;
  