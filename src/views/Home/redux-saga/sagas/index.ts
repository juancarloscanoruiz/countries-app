import { fork, all } from 'redux-saga/effects';

import * as continents from './continents';

export default function* homeSaga() {
    yield all([...Object.values(continents)].map(fork))
}