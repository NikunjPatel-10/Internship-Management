import { useEffect, useState } from "react";
import { getRoadMapData } from "../../pages/Roadmap/utility/service/Roadmap.service";

const useRoadmap = () => {
  const [roadmap, setRoadmap] = useState([]);
  // get all mentor's details
  const getRoadmap = async () => {
    await getRoadMapData().then((res) => {
      const response = res.data;
      setRoadmap(response);
    });
  };
  useEffect(() => {
    getRoadmap();
  }, []);
  return roadmap;
};

export default useRoadmap;
