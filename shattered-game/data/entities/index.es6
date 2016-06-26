
'use strict';
import architecture from './architecture';
import creatures from './creatures';

const importRegistrations = {};
importRegistrations[architecture._name||architecture.__type__] = architecture;
importRegistrations[creatures._name||creatures.__type__] = creatures;

export default importRegistrations;
  