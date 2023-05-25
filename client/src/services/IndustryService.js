import http from "../http-common";

const getAll = () => {
  return http.get("/industryData");
};

const get = id => {
  return http.get(`/industryData/${id}`);
};

const create = data => {
  return http.post("/industryData", data);
};

const update = (id, data) => {
  return http.put(`/industryData/${id}`, data);
};

const remove = id => {
  return http.delete(`/industryData/${id}`);
};

const removeAll = () => {
  return http.delete(`/industryData`);
};

const findByTitle = title => {
  return http.get(`/industryData/0/${title}`);
};

const IndustryService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};

export default IndustryService;
