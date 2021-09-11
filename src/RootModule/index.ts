import rootReducer from './reducer';
import rootSaga from './sagas';

export default function getRootModule() {
    return {
        id: 'APP',
        reducerMap: {
            APP: rootReducer
        },
        sagas: [rootSaga]
    }
}