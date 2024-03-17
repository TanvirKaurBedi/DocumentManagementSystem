import axios from "axios";
import authToken from "./authToken";

let CancelToken = axios.CancelToken;
let source = CancelToken.source();

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";


export default (
  method,
  url,
  {
    headers = {},
    params = {},
    data = {},
    onSuccess = null,
    onFailure = null,
    onFinally = null,
    responseType = "json",
    onUploadProgress = null,
    onDownloadProgress = null,
    isTokenRequired = true,
    cancel = false,
  } = {}
) => {
  const methods = ["get", "post", "patch", "put", "delete"];
  if (!methods.includes(method)) return `Method ${method} not allowed.`;
  if (!url) return "url is required";

  if (cancel) {
    source.cancel();
    source = axios.CancelToken.source();
    config.cancelToken = source.token;
  }

  if (isTokenRequired) {
    // const { accessToken } = authToken.isAuthenticated();
    headers["Authorization"] = `Bearer ${authToken.isAuthenticated()}`;
    // headers["Content-Type"] = 'multipart/form-data';
    // headers["Content-Type"] = 'application/json';
  }
  const config = {
    method,
    url,
    headers,
    params,
    data,
    responseType,
    onUploadProgress,
    onDownloadProgress,
  };

  return (
    axios(config)
      .then((response) => {
        if (onSuccess != null) {
          onSuccess(response);
        }
      })
      .catch((error) => {
        if (onFailure != null) {
          onFailure(error.response);
        }
      })
      // .failure(()=>{
      //   if(onFailure == null) {
      //     onFailure();
      //   }
      // })
      .finally(() => {
        if (onFinally != null) {
          onFinally();
        }
      })
  );
};

// import axios from 'axios';
// import auth from '@/constants/urls/auth';

// // src/axios-config.js

// const axiosInstance = axios.create({
//   baseURL: process.env.APP_API_BASE_URL,
//   // other configuration options
// });

// // Merge endpoint objects into one
// const endpoints = {
//   authApi: auth,
// };

// const AxiosPlugin = {
//   install(Vue) {
//     Vue.prototype.$http = axiosInstance;
//     Vue.prototype.$request = endpoints;
//   },
// };

// export default AxiosPlugin;