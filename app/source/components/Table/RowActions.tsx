import React from 'react';
import classnames from 'classnames';

interface IProps {
    children?: any;
    className?: string;
}

const RowActions = (props: IProps) => (
    <div className={classnames('row-actions', props.className)}>
        {props.children}
    </div>
);

export default RowActions;
