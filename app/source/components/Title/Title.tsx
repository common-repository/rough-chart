import React from 'react';
import classnames from 'classnames';

interface IProps {
    inline?: boolean;
    children?: any
}

const Title = (props: IProps) => (
    <h1
        className={classnames({
            'wp-heading-inline': props.inline,
        })}
    >
        {props.children}
    </h1>
);

export default Title;
