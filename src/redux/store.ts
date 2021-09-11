import { createStore } from 'redux-dynamic-modules';
import initialState from './initialState';
import { getSagaExtension } from 'redux-dynamic-modules-saga';

const store = createStore(
    {
        initialState,
        extensions: [getSagaExtension()],
    }
)

export default store