'use strict';
import SubscribedHandlers from 'shattered-lib/SubscribedHandlers';

const global = {
  game:null,
  subscribedHandlers: new SubscribedHandlers()
};

export default global;
