import { CountryDetailStateReducer } from "../redux-saga/reducer/country-detail.inteface";

export interface UseParamsCountryDetail {
    code: string
}


export interface CountryDetailProps {
    countryDetailRequest: Function,
    country: CountryDetailStateReducer
}