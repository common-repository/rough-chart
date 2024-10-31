import React from 'react';
import classnames from 'classnames';

interface IProps {
    children?: any;
    colSpan?: number;
    className?: string;
    hasRowActions?: boolean;
}

const Td = (props: IProps) => (
    <td colSpan={props.colSpan}
        className={classnames(props.className, {
            'has-row-actions': props.hasRowActions,
        })}
    >
        {props.children}
    </td>
);

export default Td;
