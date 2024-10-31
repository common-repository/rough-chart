import queryString from 'query-string';
import urlParse from 'url-parse';
import { TChartTypes } from '../chartTypes';

const globalAppDataRef = '__roughChartsApp_$8453';

type TAdminAppData = {
    nonce: string;
    ajax_url: string;
    plugin_url: string;
    build_folder: string;
    i18n: {
        [key: string]: string;
    };
}

export const getAppData = (): TAdminAppData => {
    return window[globalAppDataRef];
};

export const getUrlToChart = (chartId: string, type?: TChartTypes) => {
    const appData = getAppData();
    const parsedUrl = urlParse(appData.plugin_url);
    const query = {
        ...queryString.parse(parsedUrl.query),
        chart_id: chartId,
        type,
    };
    return `${parsedUrl.origin}${parsedUrl.pathname}?${queryString.stringify(query)}`;
};

export const getUrlToChartsList = () => {
    const appData = getAppData();
    return appData.plugin_url;
};
