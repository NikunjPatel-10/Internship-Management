import axios from "axios";

const url = "http://localhost:3000/batchIntern";

/** getById internData Call */
export const getInternData = () => {
  return axios.get(url);
};

//** To Post InternData */
export const addInternDetails = (internData) => {
  return axios.post(url, internData);
};

//** Delete The Data */
export const deleteInternDetails = (id) => {
  return axios.delete(url + "/" + id);
};

//** Get Data by Id */
export const getInternDetailsById = (id) => {
  return axios.get(url + "/" + id);
};

//** Update the Data */
export const updateInternDetails = (id, internData) => {
  return axios.put(url + "/" + id, internData);
};
