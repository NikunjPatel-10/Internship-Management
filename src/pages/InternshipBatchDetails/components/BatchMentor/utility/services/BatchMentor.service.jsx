import axios from "axios";
const baseUrl = "http://localhost:3000/";
const URL = baseUrl + "batchMentor/";

//To Get Mentor Data
export const getBatchMentor = async () => {
  return await axios.get(URL);
};

// To Post Mentor Data
export const addBatchMentor = (batchMentorData) => {
  return axios.post(URL, batchMentorData);
};

// Delete Mentor Data
export const deleteBatchMentor = async (id) => {
  return await axios.delete(URL + id);
};
// Get Mentor by Id
export const getBatchMentorById = async (id) => {
  const url = URL + id;
  return await axios.get(url);
};
// Update Mentor Data
export const updateBatchMentor = async (id, batchMentor) => {
  const url = URL + id;
  return await axios.put(url, batchMentor);
};
