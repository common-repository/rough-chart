import React from 'react';
import _omit from 'lodash/omit';

interface IProps {
    onChange?: (value: string|number) => void;
    disabled?: boolean;
}
interface IState {}

/**
 * This component will test whether user is using allowed characters.
 * It means that it will allow to the user start typing `-`, `.` characters,
 * because you can do it in order to write a number.
 */
class NumericInput extends React.PureComponent<IProps, IState> {
    static defaultProps = {
        onChange: null,
        disabled: false,
    };

    numRegex = /^-?\d*\.?\d*$/;

    handleChange = (e) => {
        const rawValue = e.target.value;
        if (this.numRegex.test(rawValue)) {
            this.updateParent(e)
        }
    };

    updateParent(e) {
        const { onChange } = this.props;
        onChange && onChange(e);
    }

    render() {
        const { disabled } = this.props;
        return (
            <input
                {..._omit(this.props, ['onChange', 'type'])}
                type='number'
                onChange={this.handleChange}
                disabled={disabled}
            />
        );
    }
}

export default NumericInput;
