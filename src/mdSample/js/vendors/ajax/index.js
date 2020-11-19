(function (context) {
  if (!context) return
  let axios = require('axios')
  let customConfig = {
    headers: {},
    timeout: 3000,
    responseType: 'json',
    responseEncoding: 'utf8',
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    // `maxContentLength` defines the max size of the http response content in bytes allowed in node.js
    maxContentLength: 2000,

    // `validateStatus` defines whether to resolve or reject the promise for a given
    // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
    // or `undefined`), the promise will be resolved; otherwise, the promise will be
    // rejected.
    validateStatus: function (status) {
      return status >= 200 && status < 300; // default
    },
    
  }

  axios.defaults = Object.assign({}, axios.defaults, customConfig)

  // request拦截器
  // Add a request interceptor
  axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  // response拦截器
  // Add a response interceptor
  axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

  function prepare(url, body) {
    if (url.indexOf('http')===0) {
      body._redirect_ = url
      url = '/_redirect_'
    }
    return {url, body}
  }
  
  context.Fetcher = {
    interceptors: axios.interceptors,
    create(){
      return axios.create.apply(null, arguments)
    },

    async get(api, param={}, option={}){
      let headers = Object.assign({}, param.headers, option.headers); delete param.headers;
      let {url, body} = prepare(api, param)
      headers._isajax_ = true
      option.headers = headers
      let res = await axios.get(url, {
        params: body,
        ...option
      })
      return { data: res.data }
    },

    async post(api, param={}, option={}){
      let headers = Object.assign({}, param.headers, option.headers); delete param.headers;
      let {url, body} = prepare(api, param)
      option.headers = headers
      let res = await axios.post(url, {
        body,
        ...option
      })
      return { data: res.data }
    }
  }
})(typeof window === 'undefined' ? null : window)
