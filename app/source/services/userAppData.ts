const globalAppDataRef = '__roughChartsApp_$8453';

type TUserAppData = {
    rest_api_url: string;
}

export const getAppData = (): TUserAppData => {
    return window[globalAppDataRef];
};
