import _get from 'lodash/get';
import { getAppData } from './adminAppData';

const defaultTranslations = getAppData().i18n;

export const t = (translationSlug) => {
    return _get(defaultTranslations, translationSlug, translationSlug);
};
