import { CombinedError } from "@urql/core";
import { Continent } from "../../../../common/interfaces/continent.interface";

export interface ContinentsSuccessPayload {
    data: Continent[],
    error: CombinedError | undefined | unknown
}

export interface ContinetsFailPayload {
    error: CombinedError | undefined | unknown
}