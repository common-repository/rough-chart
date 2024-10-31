import React from 'react';
import styled from 'styled-components';
import Color from 'color';
import NoteModel, { ENotification } from './NoteModel';
import * as colors from '../../styles/colors';

type TNoteComponent = {
    type?: ENotification;
};

const Note = styled.div<TNoteComponent>`
    position: absolute;
    color: white;
    padding: 5px 10px;
    border-radius: 3px;
    border: 1px solid black;
    ${(props) => {
        switch (props.type) {
            case ENotification.Error:
                return `
                    background-color: ${Color(colors.danger).fade(0.3).rgb().string()};
                    border-color: ${Color(colors.danger).darken(0.15).rgb().string()};
                `;
            case ENotification.Success:
            default:
                return `
                    background-color: ${Color(colors.success).fade(0.25).rgb().string()};
                    border-color: ${Color(colors.success).darken(0.1).rgb().string()};
                `;
        }
    }};
`;

interface IProps {
    data: NoteModel;
    index: number;
}
interface IStat {}

class MsgItem extends React.PureComponent<IProps, IStat> {
    render() {
        const { data, index } = this.props;
        return (
            <Note
                type={data.type}
                style={{
                    top: 10 + (15 * index),
                    right: 20 + (5 * index),
                }}
            >
                {this.props.data.msg}
            </Note>
        );
    }
}

export default MsgItem;
