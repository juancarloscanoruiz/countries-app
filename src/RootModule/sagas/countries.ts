import { call, takeEvery, put, all } from "redux-saga/effects";
import { COUNTRIES_REQUEST, countriesSuccess, countriesFail } from "../actions/countries";
import { Client, OperationResult } from 'urql';
import { CountriesQuery } from "../../graphql/queries/countries";
import { CountriesPayload } from "../reducer/countries/countries.interface";
import { CountryActionPayload } from "../actions/country-payload.interface";


const client = new Client({
    url: 'https://countries.trevorblades.com/'
})


const fetchCountries = async (payload: any) => {
    const resultCountries = await client.query(CountriesQuery, { filter: payload }).toPromise()
    return resultCountries
}

function* workCountriesRequest(action: any) {
    console.log(action);
    const actionCountriesRequest: CountryActionPayload = action;
    const { payload } = actionCountriesRequest;
    try {
        const { data, error } : OperationResult = yield call(fetchCountries, {
            continent: {
              regex: payload?.continentCode
            },
            currency: {
                regex: payload?.currency
            }
          })
        const responseCountries: CountriesPayload =  {
            data: data.countries,
            error,
        }
        if (data && !error) {
            yield put(countriesSuccess(responseCountries))
        } else {
            yield put(countriesFail())
        }
    } catch (error) {
       yield put(countriesFail()); 
    }
}

export function* watchCountriesRequest() {
    yield all ([takeEvery(COUNTRIES_REQUEST, workCountriesRequest)])
}