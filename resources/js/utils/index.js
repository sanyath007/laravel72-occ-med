import moment from "moment";

export const generateQueryString = (inputs) => {
    let queryStr = '';
    for (const [key, val] of Object.entries(inputs)) {
        queryStr += `&${key}=${val}`;
    }

    return queryStr;
};

export const isExisted = (items, id) => {
    return items.some(item => item.id === id);
};

export const isExistedItem = (items, fieldName = 'id', checkVal) => {
    return items.some(item => item[fieldName] === checkVal);
};

export const getFileExtension = (file) => {
    if (!file) return '';

    const [name, extension] = file?.name?.split('.');

    return extension;
};

export const validateFile = (file, acceptedTypes = []) => {
    const isValid = acceptedTypes.includes(getFileExtension(file));

    return isValid;
};

export const createFileFromUrl = async (url, filename, defaultType) => {
    const res = await fetch(url);
    let data = await res.blob();

    return new File([data], filename, { type: 'image/jpeg' });
};

export const string2Array = (str) => {
    if (!str || str === '') return [];

    return str.split(',');
};

export const imageString2UrlArray = (str, path) => {
    if (!str || str === '') return [];

    return string2Array(str).map(filename => `${path}/${filename}`);
};

export const filesizes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const getFilenameFormUrl = (url) => {
    return new URL(url).pathname.split('/').pop()
};

export const generateBudgetYear = () => {
    if (moment().month() > 9) {
        return moment().year() + 1;
    }

    return moment().year();
};

export const getFormDataItem = (data, dataName, id) => {
    if (!data) return null;

    return data[dataName].find(item => item.id === id);
};

export const removeItemWithFlag = (items, id, isNew) => {
    if (isNew) {
        return items.filter(item => item.id !== id);
    } else {
        /** Create new items array by setting removed flag if item is removed by user */
        return items.map(item => {
            if (item.id === id) return { ...item, removed: true };

            return item;
        });
    }
};

export const getUrlParam = (url, paramName) => {
    const params = new URLSearchParams(url);

    return params.get(paramName);
};

export const setFieldTouched = (formik, fieldName) => {
    setTimeout(() => formik.setFieldTouched(fieldName, true));
};

export const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;

    return { width, height };
}
