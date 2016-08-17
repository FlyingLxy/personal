/**
 * Created by lxy on 16/8/15.
 */

import 'fetch-ie8';

const headers = {
    'Accept': 'application/json',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language':'zh-CN,zh;q=0.8,en;q=0.6',
    'Connection': 'keep-alive',
    'Content-Type': 'application/json;charset=UTF-8'
};
const checkStatus = respones => {
    if (respones.status >= 200 && respones.status < 300) {
        return respones
    }else {
        const error = new Error(respones.statusText);
        error.response = respones;
        throw error
    }
}

const parseJSON = response => response.json();

const request = (option) => {
    if (option.method === 'GET') {
        let key = option.data && Object.keys(option.data);
        let query = key ? key.map((item,index) => {
            return key[index] = `${item}=${option.data[item]}`;
        }).join('&') : '';
        return fetch(`${option.path}?${query}`,{
            method: option.method,
            headers: Object.assign({},headers,{
                'Authorization': option.token || ''
            }),
            mode: 'cors',
            credentials: 'include'
        })
    }else {
        return fetch(option.path,{
            method: option.method,
            headers: Object.assign({},headers,{
                'Authorization': option.token || ''
            }),
            mode: 'cors',
            credentials: 'include',
            body: option.data ? JSON.stringify(option.data) : ''
        })
    }
}

const get = option => request(Object.assign({},option,{method: 'GET'})).then(checkStatus).then(parseJSON);
const post = option => request(Object.assign({},option,{method: 'POST'})).then(checkStatus).then(parseJSON);
const put = option => request(Object.assign({},option,{method: 'PUT'})).then(checkStatus).then(parseJSON);
const delet = option => request(Object.assign({},option,{method: 'DELETE'})).then(checkStatus).then(parseJSON);

export default {
    get,
    post,
    put,
    delet
}