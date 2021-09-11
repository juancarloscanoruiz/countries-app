import { CountriesPayload } from "../reducer/countries/countries.interface";
import { CountryActionPayload } from "./country-payload.interface";

export const COUNTRIES_REQUEST = 'COUNTRIES_REQUEST';
export const COUNTRIES_SUCCESS = 'COUNTRIES_SUCCESS';
export const COUNTTRIES_FAIL = 'COUNTRIES_FAIL';

export function countriesRequest(payload: CountryActionPayload) {
    return {
        type: COUNTRIES_REQUEST,
        payload,
    }
}

export function countriesSuccess(payload: CountriesPayload) {
    return {
        type: COUNTRIES_SUCCESS,
        payload,
    }
}

export function countriesFail() {
    return {
        type: COUNTTRIES_FAIL,
    };
}