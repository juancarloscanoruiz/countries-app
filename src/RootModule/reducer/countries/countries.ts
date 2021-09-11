import { COUNTRIES_REQUEST, COUNTTRIES_FAIL, COUNTRIES_SUCCESS } from '../../actions/countries';
import { CountriesStateReducer } from './countries.interface';
import { CountriesInitialState } from './countries-default-state';


const countries = (state: CountriesStateReducer = CountriesInitialState, action: any): CountriesStateReducer => {
    switch (action.type) {
        case COUNTRIES_REQUEST:
            return {
                ...state,
                success: undefined,
                isLoading: true,
                data: [],
                error: undefined
            }
        case COUNTRIES_SUCCESS:
            return {
                ...state,
                success: true,
                isLoading: false,
                data: action.payload.data,
                error: action.payload.error,
            }
    
        case COUNTTRIES_FAIL:
            return {
                ...state,
                success: false,
                isLoading: false,
                data: [],
                error: action.payload.error
            }
        default: 
            return {
                ...state
            }
    }
}

export default countries;