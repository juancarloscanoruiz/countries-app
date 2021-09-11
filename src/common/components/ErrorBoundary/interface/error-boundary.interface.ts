import { ReactChild } from "react";

export interface ErrorBoundaryProps {
    renderError?: ReactChild | ReactChild[] | undefined
}