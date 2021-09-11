import { CONTINENT_FAIL, CONTINENT_SUCCESS, CONTINENT_REQUEST } from '../actions/';
import { ContinentsInitialState } from './continents-default-state';
import { ContinentsStateReducer } from './continents.inteface';


const continents = (state: ContinentsStateReducer = ContinentsInitialState, action: any): ContinentsStateReducer => {
    switch (action.type) {
        case CONTINENT_REQUEST:
            return {
                ...state,
                success: undefined,
                isLoading: true,
                data: [],
                error: undefined
            }
        case CONTINENT_SUCCESS:
            return {
                ...state,
                success: true,
                isLoading: false,
                data: action.payload.data,
                error: action.payload.error,
            }
    
        case CONTINENT_FAIL:
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

export default continents;