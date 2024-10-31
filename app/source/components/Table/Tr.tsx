import React from 'react';

interface IProps {
    children?: any;
}

const Tr = (props: IProps) => (
    <tr>
        {props.children}
    </tr>
);

export default Tr;
