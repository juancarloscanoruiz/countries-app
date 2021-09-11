import { combineReducers } from 'redux';
import continentsReducer from './index';

const appReducer = combineReducers({
  continents: continentsReducer,
});

export default appReducer;
