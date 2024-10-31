export enum EChartColumnType {
    number,
    text,
}

/**
 * Chart column type
 * @link https://bossanova.uk/jexcel/v3/examples/column-types
 */

export interface IJExcelColumn {
    type: string;
    title: string;
    render?: string;
    width?: number;
}

export interface IChartColumn extends IJExcelColumn {
    // Synthetic property, used only inside of my app
    // Will define how to parse the value
    _valueType?: EChartColumnType;
    // Label will be used for creating data object out of jExcel array
    // If not provided, then `title` will be used
    _label?: string;
}

class ChartDataColumn {
    private readonly columnDefinition: IChartColumn;

    constructor(props: IChartColumn) {
        this.columnDefinition = props;
    }

    getLabel(): string {
        if (this.columnDefinition._label) {
            return this.columnDefinition._label;
        }
        return this.columnDefinition.title.toLowerCase();
    }

    isNumberVal(): boolean {
        if (this.columnDefinition.hasOwnProperty('_valueType')) {
            return this.columnDefinition._valueType === EChartColumnType.number;
        }
        return false;
    }

    getColumn(): IJExcelColumn {
        const result: IJExcelColumn = {
            type: '',
            title: '',
        };
        Object.keys(this.columnDefinition)
            .filter(key => !key.startsWith('_'))
            .forEach(key => result[key] = this.columnDefinition[key]);
        return result;
    }
}

export default ChartDataColumn;
