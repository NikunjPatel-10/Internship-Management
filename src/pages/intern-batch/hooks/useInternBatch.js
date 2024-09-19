import { useEffect, useState } from "react";
import { getInternsBatchData } from "../utility/service/InternBatch.service";

export const useInternBatch = (refresh) => {
  const [batch, setBatch] = useState([]);

  //** get intern of selected batch */
  const getAllBatch = () => {
    getInternsBatchData().then((response) => {
      if (response) {
        setBatch(response.data);
      }
    });
  };
  useEffect(() => {
    if (refresh) {
      getAllBatch();
    }
  }, [refresh]);
  return batch;
};
