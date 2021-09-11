import { call, takeEvery, put, all } from "redux-saga/effects";
import { CONTINENT_REQUEST, continentsSuccess, continentsFail } from "../actions/";
import { Client, OperationResult } from 'urql';
import { getContinents } from "../../../../graphql/queries/continents";
import { ContinentsPayload } from "../reducer/continents.inteface";


const client = new Client({
    url: 'https://countries.trevorblades.com/'
})


const fetchContinents = async () => {
    const resultContinents = await client.query(getContinents).toPromise()
    return resultContinents
}

function* workCountriesRequest() {
    try {
        const { data, error } : OperationResult = yield call(fetchContinents)
        const responseCountries: ContinentsPayload =  {
            data: data.continents,
            error,
        }
        if (data && !error) {
            yield put(continentsSuccess(responseCountries))
        } else {
            yield put(continentsFail({ error }))
        }
    } catch (error) {
       yield put(continentsFail({ error })); 
    }
}

export function* watchCountriesRequest() {
    yield all ([takeEvery(CONTINENT_REQUEST, workCountriesRequest)])
}