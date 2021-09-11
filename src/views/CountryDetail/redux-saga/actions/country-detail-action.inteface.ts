import { CombinedError } from "@urql/core";
import { Country } from "../../../../common/interfaces/country.interface";

export interface CountryDetailSuccessPayload {
    data: Country | undefined,
    error: CombinedError | undefined | unknown
}

export interface CountryDetailFailPayload {
    error: CombinedError | undefined | unknown
}