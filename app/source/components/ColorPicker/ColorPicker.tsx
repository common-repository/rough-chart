import React from 'react';
import classnames from 'classnames';
import iro from '@jaames/iro';
import ClickOutside from '../ClickOutside/ClickOutside';
import ColorPickerPopup from './ColorPickerPopup';

import './ColorPicker.less';

interface IProps {
    defaultColor: string;
    className?: string;
    onChange?: (colorHex: string) => void;
    disabled?: boolean;
}

interface IState {
    showPopup: boolean;
}

interface IIroColor {
    hexString: string;
    rgbString: string;
    hslString: string;
}

class ColorPicker extends React.PureComponent<IProps, IState> {
    private pickerRef = React.createRef<HTMLDivElement>();
    private colorPicker;

    static defaultProps = {
        className: '',
        onChange: null,
        disabled: false,
    };

    public state = {
        showPopup: false,
    };

    componentDidMount(): void {
        const { defaultColor } = this.props;
        // color picker options
        // Option guide: https://iro.js.org/guide.html#color-picker-options
        this.colorPicker = new iro.ColorPicker(this.pickerRef.current, {
            width: 180,
            color: defaultColor,
            borderWidth: 1,
            borderColor: '#fff',
        });

        this.colorPicker.on('color:change', this.handleColorChange);
    }

    public setColor(color: string): void {
        this.colorPicker.color.set(color);
    }

    handleColorChange = (color: IIroColor) => {
        const { onChange } = this.props;
        onChange && onChange(color.hexString);
    };

    handleClick = () => {
        const { disabled } = this.props;
        if (!disabled) {
            this.setState(prevState => ({
                showPopup: !prevState.showPopup,
            }));
        }
    };

    handleClickOutside = () => {
        const { disabled } = this.props;
        if (!disabled) {
            this.setState({ showPopup: false });
        }
    };

    render() {
        const { className, defaultColor, disabled } = this.props;
        return (
            <ClickOutside
                className='color-picker-wrapper'
                onClickOutside={this.handleClickOutside}
            >
                <div
                    className={classnames(className, {
                        'color-picker-display': true,
                        'color-picker-display_disabled': disabled,
                    })}
                    style={{
                        backgroundColor: defaultColor,
                    }}
                    onClick={this.handleClick}
                />
                <div className='color-picker-popup-container'>
                    <ColorPickerPopup
                        show={this.state.showPopup}
                    >
                        <div ref={this.pickerRef} />
                    </ColorPickerPopup>
                </div>
            </ClickOutside>
        );
    }
}

export default ColorPicker;
