import { combineReducers } from 'redux';
import countryDetailReducer from './index';

const appReducer = combineReducers({
  country: countryDetailReducer,
});

export default appReducer;
