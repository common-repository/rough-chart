import React from 'react';

interface IProps {
    children?: any;
}

const Description = (props: IProps) => (
    <p className='description'>
        {props.children}
    </p>
);

export default Description;
