import queryString from 'query-string';
import parseKey from './parseKey';

const findUnion = <T>(urlSearch: string, routes: { [key: string]: T }): T | null => {
    const currentQuery = queryString.parse(urlSearch);
    const routeKeys = Object.keys(routes);
    for (const keyStr of routeKeys) {
        if (keyStr === '*') {
            return routes[keyStr];
        }
        const parsedKey = parseKey(keyStr);
        let hasMatch = true;
        for (const keyDefinition of parsedKey) {
            const hasKeyName = !!currentQuery[keyDefinition.keyName];
            if (hasKeyName) {
                if (keyDefinition.comparison !== '*' &&
                    keyDefinition.comparison !== currentQuery[keyDefinition.keyName]) {
                    hasMatch = false;
                    break;
                }
            } else {
                hasMatch = false;
            }
        }
        if (hasMatch) {
            return routes[keyStr];
        }
    }
    return null;
};

export default findUnion;
