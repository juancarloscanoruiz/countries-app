import { FC } from 'react';
import { ListComponentProps } from './interface/list-component-props.interface';

const ListComponent: FC<ListComponentProps> = ({ data, renderEmpty, renderItem }: ListComponentProps) => {
    return(
        <> 
            {
                 data && (
                     data.length === 0 ?
                        renderEmpty
                    :
                    data.map((item) => renderItem(item))
                )
            }
        </>
    )
}

export default ListComponent;