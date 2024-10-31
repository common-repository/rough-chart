import React from 'react';
import classnames from 'classnames';

interface IProps {
    children?: any;
    className?: string;
    hasRowActions?: boolean;
}

const Th = (props: IProps) => (
    <th scope='col'
        className={classnames(props.className, {
            'has-row-actions': props.hasRowActions,
        })}
    >
        {props.children}
    </th>
);

export default Th;
