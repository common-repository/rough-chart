import roughViz from 'rough-viz';
import _get from 'lodash/get';
import { parseChart } from './shortcode/chartData';
import { TChartShortcode, TChartTypes } from './chartTypes';
import { ELegendTypes } from './containers/formProps/Legend';
import { getAppData } from './services/userAppData';

type TRoughVizChartData = {
    labels: string[];
    values: string[]|number[];
};

type TRoughVizSettings = {
    element: string;
    title: string;
    fillWeight: number;
    roughness: number;
    strokeWidth: number;
    width: number;
    height: number;
    data: TRoughVizChartData|string;
    legend?: boolean;
    legendPosition?: string;
    y?: string;
    highlight?: string;
    stroke?: string;
    color?: string;
    colors?: string[];
    fillStyle?: string;
};

const __addRoughChart = (chartInput: TChartShortcode) => {
    const chartOptions = parseChart(chartInput.chart);

    if (chartOptions && chartOptions.data) {
        const legendTypeNum = parseInt(_get(chartOptions, 'legend', -1), 10);
        const roughVizSettings: TRoughVizSettings = {
            element: '.' + chartInput.className,
            title: chartInput.title,
            fillWeight: chartOptions.fillWeight,
            roughness: chartOptions.roughness,
            strokeWidth: chartOptions.strokeWidth,
            width: chartOptions.width,
            height: chartOptions.height,
            data: {
                labels: chartOptions.data.labels,
                values: chartOptions.data.values,
            },
        };

        if (TChartTypes[chartInput.chart_type] === TChartTypes.pie) {
            roughVizSettings.fillStyle = chartOptions.fillStyle;
            roughVizSettings.stroke = chartOptions.stroke;
            roughVizSettings.highlight = chartOptions.highlight;
            roughVizSettings.colors = chartOptions.data.colors;
            roughVizSettings.legendPosition = legendTypeNum === ELegendTypes.left ? 'left' : 'right';
            roughVizSettings.legend = legendTypeNum !== ELegendTypes.hidden;
            new roughViz.Pie(roughVizSettings);
        }

        if (TChartTypes[chartInput.chart_type] === TChartTypes.bars) {
            roughVizSettings.fillStyle = chartOptions.fillStyle;
            roughVizSettings.stroke = chartOptions.stroke;
            roughVizSettings.highlight = chartOptions.highlight;
            roughVizSettings.color = chartOptions.color;
            new roughViz.BarH(roughVizSettings);
        }

        if (TChartTypes[chartInput.chart_type] === TChartTypes.columns) {
            roughVizSettings.fillStyle = chartOptions.fillStyle;
            roughVizSettings.stroke = chartOptions.stroke;
            roughVizSettings.highlight = chartOptions.highlight;
            roughVizSettings.color = chartOptions.color;
            new roughViz.Bar(roughVizSettings);
        }

        if (TChartTypes[chartInput.chart_type] === TChartTypes.lines) {
            const appData = getAppData();
            if (chartOptions.stroke) {
                roughVizSettings.colors = [ chartOptions.stroke ];
            }
            roughVizSettings.legendPosition = legendTypeNum === ELegendTypes.left ? 'left' : 'right';
            roughVizSettings.legend = legendTypeNum !== ELegendTypes.hidden;
            // For some unknown reason Line chart can't parse data if provided as simple object.
            // I even can't provide it as csv string right to the library, because api is not allowing it.
            // Therefore I'm adding this workaround that will request data from the server.
            // (Only server, only hardcore)
            roughVizSettings.data = `${appData.rest_api_url}/chart/${chartInput.id}.tsv`;
            roughVizSettings.y = 'values';
            new roughViz.Line(roughVizSettings);
        }
    }
};

window['__addRoughChart'] = __addRoughChart;
