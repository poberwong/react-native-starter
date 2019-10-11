import { Platform } from 'react-native';
import request from 'superagent';

const TIME_OUT = 30 * 1000;

let TOKEN = '';
let _401Handler = null;

export function setToken(token) {
  TOKEN = token;
}

export function set401Handler(handler) {
  _401Handler = handler;
}

function errHandler(err, url) {
  // Network failures, timeouts, and other errors that produce no response will contain no err.status or err.response fields
  let message = '';
  if (err.status) {
    if (err.status === 401) {
      // Unauthorized
      _401Handler && _401Handler();
      message = '身份认证失败';
    } else if (err.status === 503) {
      message = '服务不可用';
    } else {
      if (err.response && err.response.body) {
        message = err.response.body.message;
      } else {
        message = `${url}:未知异常`;
      }
    }
  } else {
    message = err.errno === 'ETIME' ? '响应超时' : '网络异常';
  }
  return Promise.reject(new Error(message));
}

request.Request.prototype.setCommonHeader = function() {
  TOKEN && this.set('Authorization', 'Bearer ' + TOKEN);
  return (
    this.set('x-platform', Platform.OS)
      // .set('whatever you wanna set into header', 'value')
      .timeout(TIME_OUT)
  );
};

function get(url, data) {
  console.log('get', url);
  return request
    .get(url, data)
    .setCommonHeader()
    .then(res => Promise.resolve(res.body))
    .catch(err => errHandler(err, url));
}

function post(url, data) {
  console.log('post', url);
  return request
    .post(url, data)
    .setCommonHeader()
    .then(res => Promise.resolve(res.body))
    .catch(err => errHandler(err, url));
}

function put(url, data) {
  console.log('put', url);
  return request
    .put(url, data)
    .setCommonHeader()
    .then(res => Promise.resolve(res.body))
    .catch(err => errHandler(err, url));
}

function del(url, data) {
  console.log('del', url);
  return request
    .del(url, data)
    .setCommonHeader()
    .then(res => Promise.resolve(res.body))
    .catch(err => errHandler(err, url));
}

/**
 * 通过FormData上传文件
 * @param url
 * @param file 必须包含uri和type两个字段
 * @param data
 * @returns {Promise<T>}
 */
function uploadFile(url, file, data = {}) {
  if (!file) {
    throw new Error('file cannot be empty');
  }

  if (!file.hasOwnProperty('uri')) {
    throw new Error("file must has own property 'uri'");
  }

  if (!file.hasOwnProperty('type')) {
    throw new Error("file must has own property 'type'");
  }

  const formData = new FormData();
  const filename = file.name || file.uri.split('/').pop();

  formData.append('file', {
    uri: file.uri,
    name: encodeURIComponent(filename),
    type: file.type,
  });

  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      formData.append(key, data[key]);
    }
  }

  let isError = false;
  console.log(`post ${url}`);
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + TOKEN,
      'x-platform': Platform.OS,
    },
    body: formData,
  })
    .catch(err => {
      console.log(err.message);
      return Promise.reject(new Error('网络异常'));
    })
    .then(res => {
      // ok - True if status is HTTP 2xx
      if (!res.ok) {
        isError = true;
        res.status === 401 && _401Handler && _401Handler();
        if (res.status === 503) {
          return Promise.reject(new Error('服务不可用'));
        }
      }
      if (res._bodyText) {
        return res.json();
      } else {
        return Promise.resolve();
      }
    })
    .then(res => {
      if (isError) {
        return Promise.reject(new Error(res.message));
      }
      return Promise.resolve(res);
    });
}

export default { get, post, put, del, uploadFile };
