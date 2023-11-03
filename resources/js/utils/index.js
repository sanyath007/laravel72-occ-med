export const generateQueryString = (inputs) => {
    let queryStr = '';
    for (const [key, val] of Object.entries(inputs)) {
        queryStr += `&${key}=${val}`;
    }

    return queryStr;
};

export const isExistedItem = (items, id) => {
    return items.some(item => item.id === id);
};

export const getFileExtension = (file) => {
    if (!file) return '';

    const [name, extension] = file?.name?.split('.');

    return extension;
};

export const validateFile = (file, acceptedTypes = []) => {
    if (!file) return true;

    const isValid = acceptedTypes.includes(getFileExtension(file));

    return isValid;
};

export const createFileFromUrl = async (url, filename, defaultType) => {
    const res = await fetch(url);
    let data = await res.blob();

    return new File([data], filename, { type: 'image/jpeg' });
}

export const imageString2UrlArray = (str, path) => {
    if (str === '') return [];

    return str.split(',').map(filename => `${path}/${filename}`);
};
