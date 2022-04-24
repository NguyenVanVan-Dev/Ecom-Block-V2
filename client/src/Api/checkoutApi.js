import axiosClient from "./axiosClient";

const checkoutApi = {

  checkout: (params) => {
    const url = `/checkout/store`;
    return axiosClient.post(url,params);
  },
  getListOrder: (data) => {
    const url = `/checkout/order-placed`;
    return axiosClient.get(url,data);
  }

}

export default checkoutApi;