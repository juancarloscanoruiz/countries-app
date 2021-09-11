import { CombinedError } from "@urql/core";
import { Country } from "../../../common/interfaces/country.interface";


export interface CountriesStateReducer {
    success: boolean | undefined,
    isLoading: boolean,
    data: Country[]
    error: CombinedError | undefined
}

export interface CountriesPayload {
    error: CombinedError | undefined,
    data: Country[]
}
