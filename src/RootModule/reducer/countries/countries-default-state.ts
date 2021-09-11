import { CountriesStateReducer } from "./countries.interface";

export const CountriesInitialState: CountriesStateReducer = {
    success: undefined,
    isLoading: false,
    data: [],
    error: undefined,
}