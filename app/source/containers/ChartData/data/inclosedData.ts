import ChartDataColumn, { EChartColumnType } from '../ChartDataColumn';

export const defaultData: any[][] = [
    ['A', 40, '#2196f3'],
    ['B', 100, '#66bb6a'],
    ['C', 70, '#ff9800'],
];

export const columns: ChartDataColumn[] = [
    new ChartDataColumn({
        type: 'text',
        title: 'Label',
        _label: 'labels',
        width: 120,
    }),
    new ChartDataColumn({
        type: 'text',
        title: 'Value',
        width: 120,
        _label: 'values',
        _valueType: EChartColumnType.number,
    }),
    new ChartDataColumn({
        type: 'color',
        title: 'Fill',
        width: 100,
        render: 'square',
        _label: 'colors',
    }),
];
