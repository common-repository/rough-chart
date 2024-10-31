import React from 'react';
import classnames from 'classnames';
import FormField from '../../components/FormTable/FormField';
import ColorPicker from '../../components/ColorPicker/ColorPicker';

import './PropColor.less';

interface IProps {
    title?: string;
    defaultColor?: string;
    disabled?: boolean;
    onChange: (e: any) => void;
}

interface IState {
    color: string;
}

class PropColor extends React.PureComponent<IProps, IState> {
    static defaultProps = {
        title: '',
        disabled: false,
    };

    colorPickerRef = React.createRef<ColorPicker>();

    public state = {
        color: '#2C5390',
    };

    componentDidMount(): void {
        const { defaultColor } = this.props;
        if (defaultColor) {
            this.setState({
                color: defaultColor,
            })
        }
    }

    public setColor(color: string): void {
        this.colorPickerRef.current?.setColor(color);
    }

    onChangeColor = (color: string) => {
        const { onChange } = this.props;
        this.setState({ color });
        onChange(color);
    };

    render() {
        const { disabled } = this.props;
        return (
            <FormField
                title={this.props.title}
            >
                <ColorPicker
                    className='prop-color-picker'
                    defaultColor={this.state.color}
                    onChange={this.onChangeColor}
                    disabled={disabled}
                    ref={this.colorPickerRef}
                />
                <span
                    className={classnames({
                        'prop-color-picker-text-disabled': disabled,
                    })}
                >
                    {this.state.color}
                </span>
            </FormField>
        )
    }
}

export default PropColor;
