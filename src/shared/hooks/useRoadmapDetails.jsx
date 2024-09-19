import { useEffect, useState } from "react";
import { getRoadMapDetails } from "../../pages/Roadmap/Roadmap-Details/utility/service/RoadmapDetails.service";

const useRoadmapDetails = () => {
  const [roadmapDetails, setRoadmapDetails] = useState([]);
  // get all mentor's details
  const getRoadmapDetail = async () => {
    await getRoadMapDetails().then((res) => {
      const response = res.data;
      setRoadmapDetails(response);
    });
  };
  useEffect(() => {
    getRoadmapDetail();
  }, []);
  return roadmapDetails;
};

export default useRoadmapDetails;
