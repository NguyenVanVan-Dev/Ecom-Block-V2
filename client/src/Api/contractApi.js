import axiosClient from "./axiosClient";

const contractApi = {

  getAll: (params) => {
    const url = `/contract/show`;
    return axiosClient.get(url,{ params });
  },
  detail: (params) => {
    const url = `/contract/detail`;
    return axiosClient.get(url,{ params });
  },
  delete: (params) => {
    const url = `/contract/delete`;
    return axiosClient.delete(url,{ params });
  }
}

export default contractApi;