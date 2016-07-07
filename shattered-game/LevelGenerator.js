/**
 * This file ties together the library's LevelGenerator class with the game's level generators.
 * It must be imported once to complete this process.
 * After it has been imported once, the generator can be referenced by importing either this file
 * or the original file.
 */
'use strict';
import LevelGenerators from './level-generators/index';
import LevelGenerator from 'shattered-lib/generators/LevelGenerator';

LevelGenerator._generators = LevelGenerators;

export default LevelGenerator;
