import { CombinedError } from "@urql/core";
import { Continent } from "../../../../common/interfaces/continent.interface";


export interface ContinentsStateReducer {
    success: boolean | undefined,
    isLoading: boolean,
    data: Continent[]
    error: CombinedError | undefined
}

export interface ContinentsPayload {
    error: CombinedError | undefined,
    data: Continent[]
}