import { fork, all } from 'redux-saga/effects';

import * as countries from './countries';

export default function* rootSaga() {
    yield all([...Object.values(countries)].map(fork))
}