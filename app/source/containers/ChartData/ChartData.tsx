import React from 'react';
import jexcel from 'jexcel';
import classnames from 'classnames';
import { createGlobalStyle } from 'styled-components';
import 'jexcel/dist/jexcel.css';
import Description from '../../components/Description/Description';
import ErrorBubble from '../../components/Error/ErrorBubble';
import {TChartTable, TChartTypes, TGeneralError} from '../../chartTypes';
import { t } from '../../services/i18n';
import { TJExcel, fromJExcelToData } from '../../services/chartDTO';
import { couldBeNumber } from '../../services/utils';
import contextMenu from './contextMenu';
import * as colors from '../../styles/colors';
import * as inclosedData from './data/inclosedData';
import * as columnsData from './data/columnsData';
import * as lineData from './data/lineData';
import ChartDataColumn, {EChartColumnType, IJExcelColumn} from './ChartDataColumn';

interface IProps {
    type: TChartTypes;
    data?: TJExcel;
    disabled?: boolean;
}

interface IState {
    error: TGeneralError;
}

const convertColumnsToJExcel = (list: ChartDataColumn[]): IJExcelColumn[] => {
    return list.map(column => column.getColumn());
};

const ChartDataStyle = createGlobalStyle`
    .table-has-error {
        .jexcel {
            border: 1px solid ${colors.danger};
        }
    }
    
    .jexcel_pagination {
        display: none;
    }
`;

class ChartData extends React.PureComponent<IProps, IState> {
    static defaultProps = {
        disabled: false,
    };

    public state = {
        error: null,
    };

    private tableBaseRef = React.createRef<HTMLDivElement>();
    private table: any = null;

    componentDidMount():void {
        const { data } = this.props;
        const chartData = this.getChartDataDefinition();
        this.table = jexcel(this.tableBaseRef.current, {
            data: data || chartData.defaultData,
            columns: convertColumnsToJExcel(chartData.columns),
            allowInsertRow: true,
            allowManualInsertRow: true,
            allowInsertColumn: false,
            allowManualInsertColumn: false,
            allowDeleteRow: true,
            allowDeleteColumn: false,
            contextMenu,
            onafterchanges: this.handleOnAfterChange,
        });
    }

    getChartDataDefinition() {
        const { type } = this.props;
        let chartData;
        switch (type) {
            case TChartTypes.pie:
                chartData = inclosedData;
                break;
            case TChartTypes.columns:
            case TChartTypes.bars:
                chartData = columnsData;
                break;
            case TChartTypes.lines:
                chartData = lineData;
                break;
            default:
                throw new Error(`There is no data for given "type",received: ${type}`);
        }
        return chartData;
    }

    public getData(): { data: TChartTable; error: TGeneralError; } {
        let error: TGeneralError = null;
        const jExcelData = this.table.getData();
        const chartData = this.getChartDataDefinition();
        for (const row of jExcelData) {
            for (let i = 0; i < row.length; i++) {
                const item = row[i];
                if (item === '') {
                    error = {
                        msg: t('noEmptyCellsInTable'),
                    };
                    break;
                }
                const columnDefinition: ChartDataColumn = chartData.columns[i];
                if (columnDefinition.isNumberVal() && !couldBeNumber(item)) {
                    error = {
                        msg: t('valuesShouldBeNumbers'),
                    };
                    break;
                }
            }
            if (error) { break; }
        }
        this.setState({ error });
        return {
            data: fromJExcelToData(jExcelData, chartData.columns),
            error,
        };
    }

    handleOnAfterChange = () => {
        this.setState({
            error: null,
        })
    };

    renderError() {
        if (this.state.error) {
            // @ts-ignore
            const errText = this.state.error.msg;
            return (
                <ErrorBubble>
                    {errText}
                </ErrorBubble>
            );
        }
        return null;
    }

    render() {
        return (
            <React.Fragment>
                <ChartDataStyle />
                <h2>{t('chartData')}:</h2>
                <div
                    className={classnames({
                        'table-has-error': !!this.state.error,
                    })}
                >
                    <div ref={this.tableBaseRef} />
                </div>
                <Description>
                    {t('chartDataAddRowsHint')}
                </Description>
                {this.renderError()}
            </React.Fragment>
        );
    }
}

export default ChartData;
