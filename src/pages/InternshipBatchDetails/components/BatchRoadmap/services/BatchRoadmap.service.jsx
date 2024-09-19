import axios from "axios";
const baseUrl = "http://localhost:3000/";
const URL = baseUrl + "batchRoadmap/";

//To Get Roadmap Data
export const getBatchRoadMap = async () => {
  return await axios.get(URL);
};

// To Post Roadmap Data
export const addBatchRoadMap = (batchRoadmapData) => {
  return axios.post(URL, batchRoadmapData);
};

// Delete The Data
export const deleteBatchRoadMap = async (id) => {
  return await axios.delete(URL + id);
};
// Get Data by Id
export const getBatchRoadmapById = async (id) => {
  const url = URL + id;
  return await axios.get(url);
};
// Update the Data
export const updateBatchRoadmap = async (id, batchRoadmap) => {
  const url = URL + id;
  return await axios.put(url, batchRoadmap);
};
