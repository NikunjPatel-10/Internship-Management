import { useEffect, useState } from "react";
import { getInternData } from "../utility/service/BatchIntern.service";
import { filteredData } from "../../../../../shared/utility/filteredData";
import { sortedData } from "../../../../../shared/utility/sortedData";

export const useBatchIntern = (batchId) => {
  const [batchIntern, setBatchIntern] = useState([]);
  const [reload, setReload] = useState({});

  //** get intern of selected batch */
  const getAllBatchIntern = () => {
    getInternData().then((res) => {
      if (res) {
        const response = res.data;
        // Filter Records based on batchId
        const filteredRecords = filteredData(response, batchId);
        // Sorting interns in ascending order
        const sortedInterns = sortedData(filteredRecords, "firstName");
        setBatchIntern(sortedInterns);
      }
    });
  };
  useEffect(() => {
    getAllBatchIntern();
  }, [reload]);
  return [batchIntern, setReload];
};
