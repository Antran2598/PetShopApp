import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { leaders } from './leaders';
import { pets } from './pets';
import { comments } from './comments';
import { promotions } from './promotions';
import { favorites } from './favorites';

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({ leaders, pets, comments, promotions, favorites }),
    applyMiddleware(thunk, logger)
  );
  return store;
};