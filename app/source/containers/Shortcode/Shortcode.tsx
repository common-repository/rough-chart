import React from 'react';

interface IProps {
    chartId: number;
    title?: string;
}

export const getShortcode = (chartId: number, title?: string): string => {
    const shortcodeProps = [
        `id="${chartId}"`
    ];
    if (title) {
        shortcodeProps.push(`title="${title}"`);
    }
    return `[roughchart ${shortcodeProps.join(' ')}]`;
};

const Shortcode = (props: IProps) => (
    <>
        {getShortcode(props.chartId, props.title)}
    </>
);

export default Shortcode;
