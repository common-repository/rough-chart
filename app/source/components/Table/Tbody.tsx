import React from 'react';

interface IProps {
    children?: any;
}

const Tbody = (props: IProps) => (
    <tbody>
        {props.children}
    </tbody>
);

export default Tbody;
