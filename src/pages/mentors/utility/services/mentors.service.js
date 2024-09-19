import axios from "axios";
const baseUrl = "http://localhost:3000/";

// to get all mentor details
export const getMentorData = async () => {
  return await axios.get(baseUrl + "mentors");
};

// to get all domains
export const getDomain = async () => {
  return await axios.get(baseUrl + "domain");
};
// to get all designations
export const getDesignation = async () => {
  return await axios.get(baseUrl + "designation");
};

// to add mentor details
export const addMentor = async (mentor) => {
  const url = baseUrl + "mentors";
  return await axios.post(url, mentor);
};

// to delete mentor details
export const deleteMentorData = async (id) => {
  const url = baseUrl + "mentors/" + id;
  return await axios.delete(url);
};

// get selected mentor details by id
export const getMentorById = async (id) => {
  const url = baseUrl + "mentors/" + id;
  return await axios.get(url);
};

// to update mentor details
export const updateMentor = async (id, mentor) => {
  const url = baseUrl + "mentors/" + id;
  return await axios.put(url, mentor);
};
