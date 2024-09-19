import { useEffect, useState } from "react";
import { getBatchRoadMap } from "../../pages/InternshipBatchDetails/components/BatchRoadmap/services/BatchRoadmap.service";
import { filteredData } from "../utility/filteredData";
import { sortedData } from "../utility/sortedData";

const useBatchRoadmap = (batchId) => {
  const [data, setData] = useState([]);
  const getBatchRoadmapDetails = async () => {
    await getBatchRoadMap().then((res) => {
      const response = res.data;
      // Filter Records based on batchId
      const filteredRecords = filteredData(response, batchId);
      // Sorting roadmaps in ascending order
      const sortedRoadmap = sortedData(filteredRecords, "topic");
      setData(sortedRoadmap);
    });
  };
  useEffect(() => {
    getBatchRoadmapDetails();
  }, [batchId]);
  return [getBatchRoadmapDetails,data];
};

export default useBatchRoadmap;
