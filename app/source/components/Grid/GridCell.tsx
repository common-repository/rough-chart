import React from 'react';
import classnames from 'classnames';

interface IProps {
    children?: any;
    className?: string;
    columns: string;
}

const GridCell = (props: IProps) => {
    const { columns, className } = props;
    const splitCharacter = ' ';
    const cellClass = columns
        .replace(/\s+/g, splitCharacter)
        .toLowerCase()
        .trim()
        .split(splitCharacter)
        .map(name => `col-${name}`)
        .join(' ');
    return (
        <div className={classnames(className, cellClass)}>
            {props.children}
        </div>
    );
};

export default GridCell;
