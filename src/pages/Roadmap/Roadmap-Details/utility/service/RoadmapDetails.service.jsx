import axios from "axios";
const baseUrl = "http://localhost:3000/";

//To Get Roadmap Data
export const getRoadMapDetails = async () => {
  return await axios.get(baseUrl + "roadmapDetails");
};

// To Post Roadmap Data
export const addRoadMapDetails = (roadmapData) => {
  const url = baseUrl + "roadmapDetails";
  return axios.post(url, roadmapData);
};
// Get Data by Id
export const getRoadmapDetailsById = async (id) => {
  const url = baseUrl + "roadmapDetails/" + id;
  return await axios.get(url);
};
// Delete The Data
export const deleteRoadMapDetails = async (user, deleteId) => {
  const url = baseUrl + "roadmapDetails/" + user.id;

  if (user.topics.length > 1) {
    user.topics = user.topics.filter((record) => record.id !== deleteId);
    return await axios.put(url, user);
  } else {
    return await axios.delete(url);
  }
};

// Update the Data
export const updateRoadmapDetails = async (id, roadmap) => {
  const url = baseUrl + "roadmapDetails/" + id;
  return await axios.put(url, roadmap);
};
