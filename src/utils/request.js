import axios from 'axios';
import bus from './bus';

const service = axios.create({
  baseURL: 'http://10.0.32.10:8000',
  timeout: 5000
});

service.interceptors.response.use(response => {
  if (response.data.code === 1000) {
    bus.$emit('toLogin');
  } else if (response.data.code !== 0) {
    console.log(response.data.reason);
  }
  return response.data;
}, err => {
  return Promise.reject(err);
})

export default {
  get(url, params) {
    return service({
      url,
      method: 'get',
      params: params
    })
  },
  post(url, data) {
    return service({
      url,
      method: 'post',
      data
    })
  },
  patch(url, data) {
    return service({
      url,
      method: 'patch',
      data
    })
  },
  delete(url, data) {
    return service({
      url,
      method: 'delete',
      data
    })
  }
}