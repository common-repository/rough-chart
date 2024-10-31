declare var jQuery;
import _get from 'lodash/get';
import { t } from './i18n';
import { getAppData } from './adminAppData';
import { sendNotification } from '../components/Notifications/Notifications';
import { ENotification } from '../components/Notifications/NoteModel';

export type TAddNewChartResult = {
    inserted_rows: number;
    last_id: number;
};

export const generalErrorHandler = (response) => {
    const statusText = _get(response, 'statusText', t('anErrorOccurred'));
    if (statusText !== 'abort') {
        sendNotification(statusText, ENotification.Error);
        const errDescription = {
            responseJSON: response.responseJSON,
            status: response.status,
            statusText: response.statusText,
        };
        console.error(errDescription);
        // This return statement will allow to use `.fail` again down the line.
        return errDescription;
    }
};

export const addNewChart = (chartData = {}) => {
    const appData = getAppData();
    return jQuery
        .ajax({
            url: appData.ajax_url,
            type: 'post',
            data: {
                action: 'rough_chart_add_new_chart',
                security: appData.nonce,
                chart: JSON.stringify(chartData),
            }
        })
        .fail(generalErrorHandler);
};

export const updateChart = (chartId: number, chartData = {}) => {
    const appData = getAppData();
    return jQuery
        .ajax({
            url: appData.ajax_url,
            type: 'post',
            data: {
                action: 'rough_chart_update_chart',
                security: appData.nonce,
                chart: JSON.stringify(chartData),
                chart_id: chartId,
            }
        })
        .fail(generalErrorHandler);
};

export const getAllChart = () => {
    const appData = getAppData();
    return jQuery
        .ajax({
            url: appData.ajax_url,
            type: 'post',
            data: {
                action: 'rough_chart_get_all_charts',
                security: appData.nonce,
            }
        })
        .fail(generalErrorHandler);
};

export const getChartById = (chartId: number) => {
    const appData = getAppData();
    return jQuery
        .ajax({
            url: appData.ajax_url,
            type: 'post',
            data: {
                action: 'rough_chart_get_chart_by_id',
                security: appData.nonce,
                chart_id: chartId,
            }
        })
        .fail(generalErrorHandler);
};

export const deleteChart = (chartId: number) => {
    const appData = getAppData();
    return jQuery
        .ajax({
            url: appData.ajax_url,
            type: 'post',
            data: {
                action: 'rough_chart_delete_chart',
                security: appData.nonce,
                chart_id: chartId,
            }
        })
        .fail(generalErrorHandler);
};
