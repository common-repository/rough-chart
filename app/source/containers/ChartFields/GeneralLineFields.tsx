import React from 'react';
import {defaultStyle} from '../formProps/FillStyle';
import PropColor from '../formProps/PropColor';
import Legend, {defaultLegend} from '../formProps/Legend';
import FormTable from '../../components/FormTable/FormTable';
import {t} from '../../services/i18n';
import GridCell from '../../components/Grid/GridCell';
import Grid from '../../components/Grid/Grid';
import BasicFields, {IBasicFieldsProps, IBasicFieldsState, IChartProps} from './BasicFields';
import {TChartTable, TChartTypes} from '../../chartTypes';
import {fromDataToJExcel, TJExcel} from '../../services/chartDTO';

interface IGeneralLineFieldsOutput extends IChartProps {
    chart_type: string;
}

interface IProps extends IBasicFieldsProps {
    chartProps: any;
    chartType: TChartTypes;
}

interface IState extends IBasicFieldsState {
    fillStyle: string;
    fillColor: string;
    strokeColor: string;
    highlightColor: string;
    dataUpdated: boolean;
    legend: string;
}

class GeneralLineFields extends BasicFields<IProps, IState> {
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
        strokeColor: '#0166b5',
        fillColor: '#039be5',
        highlightColor: '#4fc3f7',
        legend: defaultLegend.type,
        strokeWidth: '',
        strokeWidthErr: false,
        fillWeight: '',
        fillWeightErr: false,
        roughness: '',
        roughnessErr: false,
        dataUpdated: false,
    };

    fillColorRef = React.createRef<PropColor>();
    strokeColorRef = React.createRef<PropColor>();
    highlightColorRef = React.createRef<PropColor>();

    static getDerivedStateFromProps(props: IProps, state) {
        // I'm updating state only once, when data is received (if it is what will happen).
        // The assumption here is that I'll receive data only once in the lifecycle.
        // It doesn't look legit that I'll request server more than once.
        if (props.chartProps && !state.dataUpdated) {
            return {
                title: props.chartProps.title,
                width: props.chartProps.chart.width,
                height: props.chartProps.chart.height,
                strokeColor: props.chartProps.chart.stroke,
                highlightColor: props.chartProps.chart.highlight,
                fillColor: props.chartProps.chart.color,
                strokeWidth: String(props.chartProps.chart.strokeWidth),
                fillWeight: String(props.chartProps.chart.fillWeight),
                roughness: String(props.chartProps.chart.roughness),
                legend: props.chartProps.chart.legend,
                dataUpdated: true,
            };
        }
        return null;
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
        if (!prevState.dataUpdated && this.state.dataUpdated) {
            this.fillColorRef.current?.setColor(this.state.fillColor);
            this.strokeColorRef.current?.setColor(this.state.strokeColor);
            this.highlightColorRef.current?.setColor(this.state.highlightColor);
        }
    }

    public getData(): IGeneralLineFieldsOutput {
        const { fillStyle, fillColor, strokeColor, highlightColor, legend } = this.state;
        const { chartType } = this.props;
        const superData = super.getData();
        return {
            ...superData,
            chart_type: TChartTypes[chartType],
            chart: {
                ...superData.chart,
                color: fillColor,
                stroke: strokeColor,
                highlight: highlightColor,
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

    renderLineFields() {
        const { disabled, chartType } = this.props;
        if (chartType !== TChartTypes.lines) {
            return (
                <>
                    <PropColor
                        title={t('fillColor')}
                        defaultColor={this.state.fillColor}
                        onChange={this.updateProp.bind(this, 'fillColor')}
                        disabled={disabled}
                        ref={this.fillColorRef}
                    />
                    <PropColor
                        title={t('highlightColor')}
                        defaultColor={this.state.highlightColor}
                        onChange={this.updateProp.bind(this, 'highlightColor')}
                        disabled={disabled}
                        ref={this.highlightColorRef}
                    />
                </>
            );
        }
        return (
            <>
                <Legend
                    value={this.state.legend}
                    onChange={this.updateProp.bind(this, 'legend')}
                    disabled={disabled}
                />
            </>
        );
    }

    renderStrokeColorFields() {
        const { disabled } = this.props;
        return (
            <>
                <PropColor
                    title={t('strokeColor')}
                    defaultColor={this.state.strokeColor}
                    onChange={this.updateProp.bind(this, 'strokeColor')}
                    disabled={disabled}
                    ref={this.strokeColorRef}
                />
            </>
        );
    }

    renderChartData() {
        const { chartType } = this.props;
        const type = chartType === TChartTypes.lines ? chartType : TChartTypes.columns;
        return super.renderChartData(type);
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
                            {this.renderLineFields()}
                            {this.renderStrokeColorFields()}
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

export default GeneralLineFields;
