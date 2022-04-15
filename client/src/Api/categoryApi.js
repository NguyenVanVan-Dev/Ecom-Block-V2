import axiosClient from "./axiosClient";

const categoryApi = {

  getAll: (params) => {
    const url = `/category/show`;
    return axiosClient.get(url,{ params });
  },
  store: (data) => {
    const url = `/category/store`;
    return axiosClient.post(url,data);
  },
  update: (data) => {
    const url = `/category/update`;
    return axiosClient.put(url,data);
  },
  detail: (params) => {
    const url = `/category/detail`;
    return axiosClient.get(url,{ params });
  },
  delete: (params) => {
    const url = `/category/delete`;
    return axiosClient.delete(url,{ params });
  }
}

export default categoryApi;