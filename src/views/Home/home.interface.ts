import { CountriesStateReducer } from "../../RootModule/reducer/countries/countries.interface";
import { ContinentsStateReducer } from "./redux-saga/reducer/continents.inteface";

export interface HomeViewProps {
    countriesRequest: Function,
    countries: CountriesStateReducer,
    continentsRequest: Function,
    continents: ContinentsStateReducer
}