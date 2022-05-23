import axiosClient from "./axiosClient";

const employeeApi = {

  getAll: (params) => {
    const url = `/employee/show`;
    return axiosClient.get(url,{ params });
  },
  store: (data) => {
    const url = `api/employee/register`;
    return axiosClient.post(url,data);
  },
  update: (data) => {
    const url = `/employee/update`;
    return axiosClient.put(url,data);
  },
  detail: (params) => {
    const url = `/employee/detail`;
    return axiosClient.get(url,{ params });
  },
  delete: (params) => {
    const url = `/employee/delete`;
    return axiosClient.delete(url,{ params });
  }
}

export default employeeApi;