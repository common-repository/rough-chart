type TRouteDefinitionKey = {
    origin: string;
    keyName: string;
    comparison: string;
};

const parseKey = (key: string): TRouteDefinitionKey[] => {
    const keyRegex = /([^=&?]+)=([^&]*)/gm;
    let match;
    const result: TRouteDefinitionKey[] = [];
    while ((match = keyRegex.exec(key)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (match.index === keyRegex.lastIndex) {
            keyRegex.lastIndex++;
        }

        const group: TRouteDefinitionKey = {
            origin: '',
            keyName: '',
            comparison: '',
        };

        match.forEach((match: string, idx) => {
            switch (idx) {
                case 0:
                    group.origin = match;
                    break;
                case 1:
                    group.keyName = match;
                    break;
                case 2:
                    group.comparison = match;
                    break;
            }
        });
        result.push(group);
    }
    return result;
};

export default parseKey;
