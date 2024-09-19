import axios from "axios";
const baseUrl = "http://localhost:3000/internshipBatch";

//To Get intern-batch Data
export const getInternsBatchData =  () => {
  return axios.get(baseUrl );
};

// To Post intern-batch Data
export const addInternsBatch =  (internsBatchData) => {
  return axios.post(baseUrl, internsBatchData);
};

// Delete The Data
export const deleteInternsBatch =  (id) => {
  return axios.delete(baseUrl + "/" + id);
};

/** getById the Call */
export const getByIdInternBatchData =  (id) => {
  return axios.get(baseUrl + "/" + id);
};

// Update the Data
export const updateInternsBatch =  (id,values) => {
  return axios.put(baseUrl + "/" + id,values);
};
