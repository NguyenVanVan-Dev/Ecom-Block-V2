import axiosClient from "./axiosClient";

const orderApi = {

  getAll: (params) => {
    const url = `/order/get-all`;
    return axiosClient.get(url,{ params });
  },
  detail: (params) => {
    const url = `/order/detail`;
    return axiosClient.get(url,{ params });
  },
  update: (params) => {
    const url = `/order/update`;
    return axiosClient.put(url,params);
  },
}

export default orderApi;