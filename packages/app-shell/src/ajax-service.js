import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${sessionStorage.getItem(
      "accessToken"
    )}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      sessionStorage.removeItem("accessToken");
      window.location.pathname = "/signin";
    }
    return Promise.reject(error);
  }
);

const doAjax = (method, url, headers = {}, data) => {
  const defaultHeaders = {
    "X-Content-Type-Options": "nosniff",
    "X-XSS-Protection": "1; mode=block",
    "X-Frame-Options": "deny",
  };

  return axios({
    method,
    url,
    data,
    headers: { ...defaultHeaders, ...headers },
  });
};

export { doAjax };
export default doAjax;
