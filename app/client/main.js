import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';
import { gameScreen } from '/imports/client/game/game';

Template.body.helpers({ game: gameScreen });
