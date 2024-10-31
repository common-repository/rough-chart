import React from 'react';
import withClickOutside from 'react-click-outside';

interface IProps {
    onClickOutside: () => void;
    className?: string;
}

interface IState {}

class ClickOutside extends React.PureComponent<IProps, IState> {
    static defaultProps = {
        className: '',
    };

    handleClickOutside = () => {
        const { onClickOutside } = this.props;
        onClickOutside();
    };

    render() {
        const { className } = this.props;
        return (
            <div className={className}>
                {this.props.children}
            </div>
        );
    }
}

export default withClickOutside(ClickOutside);
