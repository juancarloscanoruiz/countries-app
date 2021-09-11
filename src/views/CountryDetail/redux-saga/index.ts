import countryDetailSaga from "./sagas";
import appReducer from './reducer/rootReducer'

export default function getCountryDetailModule() {
    return {
        id: 'COUNTRY_DETAIL',
        reducerMap: {
            COUNTRY_DETAIL: appReducer
        },
        sagas: [countryDetailSaga]
    }
}