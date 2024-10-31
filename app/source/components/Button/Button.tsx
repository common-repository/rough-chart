import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';

const ButtonSty = styled.button`
    // Overriding custom styling.
    // By default WP is using "vertical-align: top",
    // and I want to display "Loading..." text near the button.
    // (Not always, but it comes handy)
    .wp-core-ui & {
        vertical-align: middle;    
    }
`;

export enum BtnAppearance {
    Primary,
    Secondary,
    Link,
    LinkDelete,
}

interface IProps {
    type?: 'button' | 'submit' | 'reset' | undefined;
    className?: string;
    children?: any;
    appearance?: BtnAppearance;
    disabled?: boolean;
    onClick?: (e?: any) => void;
}
interface IState {}

class Button extends React.PureComponent<IProps, IState> {
    static defaultPros = {
        type: 'button',
    };

    getClassName(): string {
        const { appearance, disabled, className } = this.props;
        return classnames(className, {
            button: true,
            'button-primary': appearance === BtnAppearance.Primary && !disabled,
            'button-primary-disabled': appearance === BtnAppearance.Primary && disabled,
            'button-disabled': appearance !== BtnAppearance.Primary && disabled,
            'button-link': appearance === BtnAppearance.Link || appearance === BtnAppearance.LinkDelete,
            'button-link-delete': appearance === BtnAppearance.LinkDelete,
        });
    }

    render() {
        const { type, disabled, onClick } = this.props;
        return (
            <ButtonSty
                type={type}
                className={this.getClassName()}
                disabled={disabled}
                onClick={onClick}
            >
                {this.props.children}
            </ButtonSty>
        );
    }
}

export default Button;
