import axiosClient from "./axiosClient";

const checkoutApi = {

  checkout: (params) => {
    const url = `/checkout/store`;
    return axiosClient.post(url,params);
  },
  getListOrder: (params) => {
    const url = `/checkout/order-placed`;
    return axiosClient.get(url,{ params });
  },
  getDetailOrder: (params) => {
    const url = `/checkout/order-detail`;
    return axiosClient.get(url,{ params });
  },
  deleteOrder: (params) => {
    const url = `/checkout/delete-order`;
    return axiosClient.post(url,params);
  },
}

export default checkoutApi;