import queryString from 'query-string';
import NanoEvents from 'nanoevents';

const PUSH_STATE = 'PUSH_STATE';

export const routerEmitter = new NanoEvents();

export type QueryParams = {
    chart_id?: string;
    type?: string;
};

export const getQuery = (): QueryParams => queryString.parse(location.search);

/**
 * Push state tp the global window object and emit event, so router could rerender.
 * @param url {string}
 * @param title {string}
 * @param data {*}
 */
export const pushState = (url: string, title: string = '', data: any = null) => {
    window.history.pushState(
        data,
        title,
        url,
    );
    routerEmitter.emit(PUSH_STATE, { data, title, url });
};

export const onPushState = (cb) => {
    return routerEmitter.on(PUSH_STATE, cb);
};
