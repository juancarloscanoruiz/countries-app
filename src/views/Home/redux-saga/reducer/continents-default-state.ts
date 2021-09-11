import { ContinentsStateReducer } from "./continents.inteface";

export const ContinentsInitialState: ContinentsStateReducer = {
    success: undefined,
    isLoading: false,
    data: [],
    error: undefined,
}