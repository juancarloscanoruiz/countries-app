import { fork, all } from 'redux-saga/effects';

import * as countryDetail from './country-detail';

export default function* countryDetailSaga() {
    yield all([...Object.values(countryDetail)].map(fork))
}