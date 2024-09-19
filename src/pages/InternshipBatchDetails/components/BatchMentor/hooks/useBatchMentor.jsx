import { useEffect, useState } from "react";
import { getBatchMentor } from "../utility/services/BatchMentor.service";
import { sortedData } from "../../../../../shared/utility/sortedData";
import { filteredData } from "../../../../../shared/utility/filteredData";

const useBatchMentor = (batchId) => {
  const [batchMentor, setBatchMentor] = useState([]);
  // get mentors of selected batch
  const getAllBatchMentor = () => {
    getBatchMentor().then((res) => {
      const response = res.data;
      // Filter Records based on batchId
      const filteredRecords = filteredData(response, batchId);
      // Sorting mentors in ascending order
      const sortedMentors = sortedData(filteredRecords, "mentor");
      setBatchMentor(sortedMentors);
    });
  };
  useEffect(() => {
    getAllBatchMentor();
  }, [batchId]);
  return [getAllBatchMentor,batchMentor];
};

export default useBatchMentor;
