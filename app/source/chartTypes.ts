// Chart object as it returned from the server DB
export type TChartDB = {
    id: number;
    title: string;
    chart_type: string;
    created: string;
    last_updated: string;
    chart?: string;
};

// Type that will be used to provide data in output of the shortcode
export type TChartShortcode = {
    id: number;
    className: string;
    title: string;
    chart_type: string;
    chart: string;
};

// General chart data as it returned from the table of values
export interface TChartTable {
    [key: string]: any[];
}

export type TChartSettings = {
    stroke?: string;        // Pie chart doesn't have `stroke`
    fillStyle?: string;     // Lines chart doesn't have `fillStyle`
    highlight?: string;     // Lines chart doesn't have `highlight`
    width: number;
    height: number;
    strokeWidth: number;
    fillWeight: number;
    roughness: number;
    legend?: string;        // Columns and bars don't have legend
    color?: string;         // Pie doesn't have single `color` property
    data: TChartTable|null;
};

export enum TChartTypes {
    pie,
    bars,
    columns,
    lines,
}

// General type for errors in the app
export type TGeneralError = {
    msg: string;
}|null;

export type TSelectItem = {
    type: string;
    name: string;
}
