import axios from 'axios';
import { paramsSerializer } from 'hooks/paramsSerializer';
import FileDownload from 'js-file-download';

axios.defaults.withCredentials = false;
axios.defaults.baseURL = 'http://localhost:9000/v1/'; //please change getUrlServer() for socket server.
axios.defaults.paramsSerializer = paramsSerializer;

axios.interceptors.request.use(async (config) => {
    const token = undefined;
    if (token) {
        config.headers.common = { Authorization: `Bearer ${token}` };
    }
    return config;
});

// Add a response interceptor
axios.interceptors.response.use(
    (response) => {
        console.log(response);

        return response;
    },
    (error) => Promise.reject(error),
);

const errorHandler = (e) => {
    return Promise.resolve(e);
};


export const getAPI = (target, params, settings = {}) =>
    axios
        .get(target, {
            ...settings,
            params: params || {},
        })
        .then((resp) => Promise.resolve(resp))
        .catch((e) => errorHandler(e));

export const postAPI = (target, data) =>
    axios
        .post(target, data)
        .then((resp) => Promise.resolve(resp))
        .catch(errorHandler);

export const putAPI = (target, data) =>
    axios
        .put(target, data)
        .then((resp) => Promise.resolve(resp))
        .catch(errorHandler);

export const patchAPI = (target, data) =>
    axios
        .patch(target, data)
        .then((resp) => Promise.resolve(resp))
        .catch(errorHandler);

export const delAPI = (target, data) =>
    axios
        .delete(target, { data })
        .then((resp) => Promise.resolve(resp))
        .catch(errorHandler);

export const postAPIConfig = (target, data, config) =>
    axios
        .post(target, data, config)
        .then((resp) => Promise.resolve(resp))
        .catch(errorHandler);

export const postFileAPI = (target, data) =>
    axios
        .post(target, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((resp) => Promise.resolve(resp))
        .catch(errorHandler);

export const downloadFileAPI = async (target, fileName = 'report') => {
    try {
        const resp = await axios
            .get(target, {
                responseType: 'blob',
            })
        FileDownload(resp.data, `${fileName}.xlsx`);
        return resp;
    } catch (error) {
        errorHandler(error)
    }
}