
import { ContinentsSuccessPayload, ContinetsFailPayload } from "./continents-action.interface";

export const CONTINENT_REQUEST = "CONTINENT_REQUEST";
export const CONTINENT_SUCCESS = "CONTINENT_SUCCESS";
export const CONTINENT_FAIL = "CONTINENT_FAIL";

export function continentsRequest() {
    return {
        type: CONTINENT_REQUEST,
    }
}

export function continentsSuccess(payload: ContinentsSuccessPayload) {
    return {
        type: CONTINENT_SUCCESS,
        payload,
    }
}

export function continentsFail(payload: ContinetsFailPayload) {
    return {
        type: CONTINENT_FAIL,
        payload
    };
}