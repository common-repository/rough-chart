import React from 'react';
import FormField from '../../components/FormTable/FormField';
import { t } from '../../services/i18n';
import { TSelectItem } from '../../chartTypes';

interface IProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

interface IState {
    inputId: string;
}

export enum ELegendTypes {
    right,
    left,
    hidden,
}

export const defaultLegend: TSelectItem = { type: String(ELegendTypes.right), name: 'Right' };

const STYLES: TSelectItem[] = [
    defaultLegend,
    { type: String(ELegendTypes.left), name: 'Left' },
    { type: String(ELegendTypes.hidden), name: 'Hidden' },
];

class Legend extends React.PureComponent<IProps, IState> {
    static defaultProps = {
        disabled: false,
    };

    state = {
        inputId: 'chart_legend',
    };

    handleChange = (e) => {
        const { onChange } = this.props;
        onChange(e.target.value);
    };

    render() {
        const { disabled } = this.props;
        return (
            <FormField
                title={t('legendPosition')}
                htmlFor={this.state.inputId}
            >
                <select
                    id={this.state.inputId}
                    value={this.props.value}
                    onChange={this.handleChange}
                    disabled={disabled}
                    className='postform'
                >
                    {STYLES.map(item => (
                        <option value={item.type} key={item.type}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </FormField>
        );
    }
}

export default Legend;
