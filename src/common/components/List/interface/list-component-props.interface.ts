import { ReactChild } from 'react';

export interface ListComponentProps {
    data: any[] | undefined,
    renderEmpty?: ReactChild | ReactChild[],
    renderItem: Function
}