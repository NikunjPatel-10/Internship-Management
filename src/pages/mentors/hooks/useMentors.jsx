import { useEffect, useState } from "react";
import { getMentorData } from "../utility/services/mentors.service";
import { sortedData } from "../../../shared/utility/sortedData";

const useMentors = () => {
  const [mentors, setMentors] = useState([]);
  // get all mentor's details
  const getMentors = async () => {
    await getMentorData().then((res) => {
      const response = res.data;
      const sortedMentors = sortedData(response, "firstName");
      setMentors(sortedMentors);
    });
  };
  useEffect(() => {
    getMentors();
  }, []);
  return [getMentors,mentors];
};

export default useMentors;
