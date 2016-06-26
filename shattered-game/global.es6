'use strict';
import SubscribedHandlers from 'shattered-lib/SubscribedHandlers';
export {default as postal} from 'postal';

const global = {
  game: null,
  subscribedHandlers: new SubscribedHandlers()
};

export default global;
