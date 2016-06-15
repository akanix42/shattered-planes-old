/**
 * This file ties together the library's EntityGenerator class with the game's entity templates.
 * It must be imported once to complete this process.
 * After it has been imported once, the generator can be referenced by importing either this file
 * or the original file.
 */
'use strict';
import templates from './data/entities/index';
import EntityGenerator from 'shattered-lib/generators/EntityGenerator';
import R from 'ramda';

let _templates = R.fromPairs(R.map(template=>[template.name, template], R.flatten(R.values(templates))));
EntityGenerator._templates = _templates;

export default EntityGenerator;
