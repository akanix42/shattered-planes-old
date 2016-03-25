import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';
import game from './site/game/game.html';

Template.body.helpers({ game });
