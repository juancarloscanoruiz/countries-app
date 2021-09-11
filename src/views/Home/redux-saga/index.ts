import homeSaga from "./sagas";
import appReducer from './reducer/rootReducer'

export default function getHomeModule() {
    return {
        id: 'HOME',
        reducerMap: {
            HOME: appReducer
        },
        sagas: [homeSaga]
    }
}