import { call, takeEvery, put, all, cancelled } from "redux-saga/effects";
import { COUNTRY_DETAIL_REQUEST, countryDetailSuccess, countryDetailFail } from "../actions/";
import { Client, OperationResult } from 'urql';
import { CountryDetailPayload } from "../reducer/country-detail.inteface";
import { getCountry } from "../../../../graphql/queries/countries";


const client = new Client({
    url: 'https://countries.trevorblades.com/'
})


const fetchCountry = async (payload: any) => {
    console.log(payload)
    const resultCountry = await client.query(getCountry, { code: payload }).toPromise()
    return resultCountry
}

function* workCountryDetailRequest(action: any) {
    const { payload } = action;

    try {
        const { data, error } : OperationResult = yield call(fetchCountry, payload)
        const responseCountries: CountryDetailPayload =  {
            data: data.country,
            error,
        }
        if (data && !error) {
            yield put(countryDetailSuccess(responseCountries))
        } else {
            yield put(countryDetailFail({ error }))
        }
    } catch (error) {

        yield put(countryDetailFail({ error }))
    } finally {
        yield cancelled()
    }
}

export function* watchCountryDetailRequest() {
    yield all ([takeEvery(COUNTRY_DETAIL_REQUEST, workCountryDetailRequest)])
}