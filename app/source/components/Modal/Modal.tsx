import React from 'react';
import styled from 'styled-components';

import './Modal.less';

type TModalComponents = {
    show?: boolean;
};

const ModalBg = styled.div<TModalComponents>`
    ${props => props.show ? 'display: block;' : 'display: none;'};
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
`;

const ModalWrapper = styled.div<TModalComponents>`
    ${props => props.show ? 'display: block;' : 'display: none;'};
    position: absolute;
    top: 20%;
    left: 50%;
    background-color: white;
    border: 1px solid #909090;
    border-radius: 3px;
    transform: translate(-50%, -50%);
`;

const ModalTitle = styled.div`
    padding: 5px 10px;
    // With following approach border renders much better, than with just "border-bottom"
    border: 1px solid #e6e6e6;
    border-left-color: transparent;
    border-right-color: transparent;
    border-top-color: transparent;
`;

const ModalButtons = styled.div`
    padding: 5px 10px;
    text-align: right;
`;

const ModalContent = styled.div`
    padding: 10px;
`;

interface IProps {
    children?: any;
    title?: string;
    className?: string;
    buttons?: () => any;
    show: boolean;
}
interface IState {}

class Modal extends React.PureComponent<IProps, IState> {
    renderTitle() {
        const { title } = this.props;
        if (title) {
            return (
                <ModalTitle>
                    {title}
                </ModalTitle>
            );
        }
        return null;
    }

    renderButtons() {
        const { buttons } = this.props;
        if (buttons) {
            return (
                <ModalButtons>
                    {buttons()}
                </ModalButtons>
            );
        }
        return null;
    }

    render() {
        const { show, className } = this.props;
        return (
            <ModalBg show={show}>
                <ModalWrapper
                    className={className}
                    show={show}
                >
                    {this.renderTitle()}
                    <ModalContent>
                        {this.props.children}
                    </ModalContent>
                    {this.renderButtons()}
                </ModalWrapper>
            </ModalBg>
        )
    }
}

export default Modal;
