export const removeUndefined = (obj: Record<string, any>) => {
    return Object.keys(obj).reduce((acc: Record<string, any>, key) => {
        if (obj[key] !== undefined) {
            acc[key] = obj[key];
        }
        return acc;
    }, {});
};