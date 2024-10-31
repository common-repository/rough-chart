import React from 'react';

import './Grid.less';

interface IProps {
    children?: any;
}

const Grid = (props: IProps) => (
    <div className='row'>
        {props.children}
    </div>
);

export default Grid;
