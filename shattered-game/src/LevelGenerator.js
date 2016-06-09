'use strict';
import LevelGenerators from './level-generators/level-generators';
import LevelGenerator from 'shattered-lib/generators/LevelGenerator';

LevelGenerator._generators = LevelGenerators;

export default LevelGenerator;
