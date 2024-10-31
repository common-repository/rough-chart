import { TChartSettings } from '../chartTypes';

export const parseChart = (data: string): TChartSettings|null => {
    try {
        return JSON.parse(data);
    } catch (e) {
        console.error(e);
    }
    return null;
};
