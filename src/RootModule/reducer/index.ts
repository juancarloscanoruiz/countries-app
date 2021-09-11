import { combineReducers } from 'redux';
import countriesReducer from './countries/countries';

const appReducer = combineReducers({
    countries: countriesReducer
})

export default appReducer