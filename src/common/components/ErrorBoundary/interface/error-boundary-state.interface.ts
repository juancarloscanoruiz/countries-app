import { ReactChild } from "react";

export interface ErrorBoundaryState {
    throwsError: boolean;
    renderError: ReactChild | ReactChild[] | null;
}