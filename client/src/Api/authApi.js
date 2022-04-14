import axiosClient from "./axiosClient";

const authorizationApi = {

  login: (params) => {
    const url = `api/admin/login`;
    return axiosClient.post(url,params);
  },
  register:(params) => {
    const url = `api/admin/register`;
    return axiosClient.post(url,params);
  },
  resetLogin:(params) => {
    const url = `api/admin/reset-login`;
    return axiosClient.post(url,params);
  },
  loginGoogle: (params) => {
    const url = `api/admin/login/google`;
    return axiosClient.post(url,params);
  },
  forgotPass:(params) => {
    const url = 'api/admin/forgot-password';
    return axiosClient.put(url,params);
  },
  resetPassword:(params) => {
    const url = 'api/admin/reset-password';
    return axiosClient.put(url,params);
  },
  loginUser: (params) => {
    const url = `api/user/login`;
    return axiosClient.post(url,params);
  },
  registerUser:(params) => {
    const url = `api/user/register`;
    return axiosClient.post(url,params);
  },
}

export default authorizationApi;