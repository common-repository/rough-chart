import React from 'react';
import FillStyle, { defaultStyle } from '../formProps/FillStyle';
import {TChartTable, TChartTypes} from '../../chartTypes';
import { t } from '../../services/i18n';
import Grid from '../../components/Grid/Grid';
import GridCell from '../../components/Grid/GridCell';
import FormTable from '../../components/FormTable/FormTable';
import Legend, { defaultLegend } from '../formProps/Legend';
import BasicFields, { IBasicFieldsProps, IBasicFieldsState, IChartProps } from './BasicFields';
import { fromDataToJExcel, TJExcel } from '../../services/chartDTO';

interface IPieChartFieldsOutput extends IChartProps {
    chart_type: string;
}

interface IProps extends IBasicFieldsProps {}

interface IState extends IBasicFieldsState {
    fillStyle: string;
    dataUpdated: boolean;
    legend: string;
}

class PieChartFields extends BasicFields<IProps, IState> {
    static defaultPros = {
        chartProps: null,
        chartId: undefined,
        disabled: false,
    };

    public state = {
        title: '',  // title can be empty
        width: '',
        widthErr: false,
        height: '',
        heightErr: false,
        fillStyle: defaultStyle.type,
        legend: defaultLegend.type,
        strokeWidth: '',
        strokeWidthErr: false,
        fillWeight: '',
        fillWeightErr: false,
        roughness: '',
        roughnessErr: false,
        dataUpdated: false,
    };

    static getDerivedStateFromProps(props: IProps, state) {
        // I'm updating state only once, when data is received (if it is what will happen).
        // The assumption here is that I'll receive data only once in the lifecycle.
        // It doesn't look legit that I'll request server more than once.
        if (props.chartProps && !state.dataUpdated) {
            return {
                title: props.chartProps.title,
                width: props.chartProps.chart.width,
                height: props.chartProps.chart.height,
                fillStyle: props.chartProps.chart.fillStyle,
                strokeWidth: String(props.chartProps.chart.strokeWidth),
                fillWeight: String(props.chartProps.chart.fillWeight),
                roughness: String(props.chartProps.chart.roughness),
                legend: props.chartProps.chart.legend,
                dataUpdated: true,
            };
        }
        return null;
    }

    public getData(): IPieChartFieldsOutput {
        const { fillStyle, legend } = this.state;
        const superData = super.getData();

        return {
            ...superData,
            chart_type: TChartTypes[TChartTypes.pie],
            chart: {
                ...superData.chart,
                legend,
                fillStyle,
            },
        };
    }

    getTableData(): TChartTable|null {
        if (this.chartDataRef?.current?.getData) {
            const tableData = this.chartDataRef.current.getData();
            if (!tableData.error) {
                return tableData.data;
            }
        }
        return null;
    }

    provideChartData(): TJExcel|undefined {
        const { chartProps } = this.props;
        const hasData = !!chartProps?.chart?.data;
        return hasData ? fromDataToJExcel(chartProps.chart.data || undefined) : undefined;
    }

    updateProp(propKey: string, value: any) {
        // @ts-ignore
        this.setState({
            [propKey]: value,
            // Relatively simple solution for hiding error for the given field.
            // The alternative (and the better approach) will be to write logic for each field.
            [`${propKey}Err`]: false,
        })
    };

    renderChartFields() {
        const { disabled } = this.props;
        return (
            <>
                <FillStyle
                    value={this.state.fillStyle}
                    onChange={this.updateProp.bind(this, 'fillStyle')}
                    disabled={disabled}
                />
                <Legend
                    value={this.state.legend}
                    onChange={this.updateProp.bind(this, 'legend')}
                    disabled={disabled}
                />
            </>
        );
    }

    renderChartData() {
        return super.renderChartData(TChartTypes.pie);
    }

    render() {
        return (
            <>
                {this.renderTitle()}
                <p>{t('defineChart')}</p>
                <Grid>
                    <GridCell columns='lg-4 md-12'>
                        <FormTable>
                            {this.renderBasicFields()}
                            {this.renderChartFields()}
                        </FormTable>
                    </GridCell>
                    <GridCell columns='lg-8 md-12'>
                        {this.renderChartData()}
                    </GridCell>
                </Grid>
            </>
        );
    }
}

export default PieChartFields;
