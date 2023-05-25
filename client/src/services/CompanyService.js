import http from "../http-common";

const getAll = () => {
  return http.get("/companyData");
};

const get = id => {
  return http.get(`/companyData/${id}`);
};

const create = data => {
  return http.post("/companyData", data);
};

const update = (id, data) => {
  return http.put(`/companyData/${id}`, data);
};

const remove = id => {
  return http.delete(`/companyData/${id}`);
};

const removeAll = () => {
  return http.delete(`/companyData`);
};

const findByTitle = title => {
  return http.get(`/companyData/0/${title}`);
};

const CompanyService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};

export default CompanyService;
