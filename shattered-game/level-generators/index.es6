
'use strict';
import TestLevelGenerator from './TestLevelGenerator';

const importRegistrations = {};
importRegistrations[TestLevelGenerator._name||TestLevelGenerator.__type__] = new TestLevelGenerator();;

export default importRegistrations;
  