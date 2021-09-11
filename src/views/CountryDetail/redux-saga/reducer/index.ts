import { COUNTRY_DETAIL_FAIL, COUNTRY_DETAIL_REQUEST, COUNTRY_DETAIL_SUCCESS } from '../actions/';
import { CountryDetailInitialState } from './country-detail-initial-state';
import { CountryDetailStateReducer } from './country-detail.inteface';


const countryDetail = (state: CountryDetailStateReducer = CountryDetailInitialState, action: any): CountryDetailStateReducer => {
    switch (action.type) {
        case COUNTRY_DETAIL_REQUEST:
            return {
                ...state,
                success: undefined,
                isLoading: true,
                data: undefined,
                error: undefined
            }
        case COUNTRY_DETAIL_SUCCESS:
            return {
                ...state,
                success: true,
                isLoading: false,
                data: action.payload.data,
                error: action.payload.error,
            }
    
        case COUNTRY_DETAIL_FAIL:
            return {
                success: false,
                isLoading: false,
                data: undefined,
                error: action.payload.error
            }
        default: 
            return {
                ...state
            }
    }
}

export default countryDetail;