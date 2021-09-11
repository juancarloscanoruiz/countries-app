import { CountryDetailFailPayload, CountryDetailSuccessPayload } from "./country-detail-action.inteface";


export const COUNTRY_DETAIL_REQUEST = "COUNTRY_DETAIL_REQUEST";
export const COUNTRY_DETAIL_SUCCESS = "COUNTRY_DETAIL_SUCCESS";
export const COUNTRY_DETAIL_FAIL = "COUNTRY_DETAIL_FAIL";
export const COUNTRY_DETAIL_CLEAN = "COUNTRY_DETAIL_CLEAN";

export function countryDetailRequest(payload: string) {
    return {
        type: COUNTRY_DETAIL_REQUEST,
        payload,
    }
}

export function countryDetailSuccess(payload: CountryDetailSuccessPayload) {
    return {
        type: COUNTRY_DETAIL_SUCCESS,
        payload,
    }
}


export function countryDetailFail(payload: CountryDetailFailPayload ) {
    return {
        type: COUNTRY_DETAIL_FAIL,
        payload
    }
}