/**
 * This file ties together the library's ComponentGenerator class and the game's components.
 * It must be imported once to complete this process.
 * After it has been imported once, the generator can be referenced by importing either this file
 * or the original library file.
 */
'use strict';
import components from './components/index';
import ComponentGenerator from 'shattered-lib/generators/ComponentGenerator';

ComponentGenerator._components = components;

export default ComponentGenerator;
