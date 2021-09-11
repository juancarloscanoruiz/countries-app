import { CombinedError } from "@urql/core";
import { Country } from "../../../../common/interfaces/country.interface";


export interface CountryDetailStateReducer {
    success: boolean | undefined,
    isLoading: boolean,
    data: Country | undefined
    error: CombinedError | undefined | unknown
}

export interface CountryDetailPayload {
    error: CombinedError | undefined | unknown,
    data: Country | undefined
}