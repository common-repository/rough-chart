import React from 'react';
import { rndSalt } from '../../services/utils';
import FormField from '../../components/FormTable/FormField';
import Description from '../../components/Description/Description';

interface IProps {
    title?: string;
    description?: string;
    value: boolean;
    onChange: (e: any) => void;
    error?: boolean;
    disabled?: boolean;
}

interface IState {
    inputId: string;
}

class PropCheckbox extends React.PureComponent<IProps, IState> {
    static defaultProps = {
        title: '',
        description: '',
        error: false,
        disabled: false,
    };

    public state = {
        inputId: 'prop-checkbox',
    };

    componentDidMount(): void {
        this.setState({
            inputId: `${this.state.inputId}-${rndSalt()}`,
        })
    }

    handleChange = (e: any) => {
        const { onChange } = this.props;
        onChange(e.target.checked);
    };

    render() {
        const { disabled } = this.props;
        return (
            <FormField
                title={this.props.title}
                htmlFor={this.state.inputId}
                error={this.props.error}
            >
                <div className='prop-input-data'>
                    <input
                        id={this.state.inputId}
                        checked={this.props.value}
                        onChange={this.handleChange}
                        disabled={disabled}
                        type='checkbox'
                    />
                    <Description>
                        {this.props.description}
                    </Description>
                </div>
            </FormField>
        )
    }
}

export default PropCheckbox;
