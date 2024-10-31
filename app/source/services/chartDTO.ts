import _isArray from 'lodash/isArray'
import _get from 'lodash/get'
import { TChartTable } from '../chartTypes';
import ChartDataColumn from '../containers/ChartData/ChartDataColumn';

export type TJExcel = any[][];

export const fromJExcelToData = (jExcel: TJExcel, columns: ChartDataColumn[]): TChartTable => {
    const result: TChartTable = {};
    if (_isArray(jExcel)) {
        jExcel.forEach((row) => {
            for (let i = 0; i < columns.length; i++) {
                const columnDefinition = columns[i];
                const label = columnDefinition.getLabel();
                const itemRaw = _get(row, `[${i}]`, '');
                const item = columnDefinition.isNumberVal() && itemRaw !== '' ? parseFloat(itemRaw) : itemRaw;
                if (result.hasOwnProperty(label)) {
                    result[label].push(item);
                } else {
                    result[label] = [ item ];
                }
            }
        });
    }
    return result;
};

export const fromDataToJExcel = (data?: TChartTable): TJExcel => {
    const result: TJExcel = [];
    if (data) {
        const keysList = Object.keys(data);
        const lengthArgs: number[] = keysList.reduce((acc, key) => {
            return [
                ...acc,
                data[key].length,
            ];
        }, []);
        const maxLength = Math.max(...lengthArgs);
        for (let i = 0; i < maxLength; i++) {
            const row: any[] = [];
            keysList.forEach((key) => {
                row.push(_get(data, `[${key}][${i}]`, ''));
            });
            result.push(row);
        }
    }
    return result;
};
