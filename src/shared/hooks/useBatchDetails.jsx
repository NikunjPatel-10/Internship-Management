import { useEffect, useState } from "react";
import { getInternsBatchData } from "../../pages/Intern-batch/utility/service/InternBatch.service";

const useBatchDetail = () => {
  const [batchDetails, setBatchDetails] = useState([]);
  // get all mentor's details
  const getBatchDetails = async () => {
    await getInternsBatchData().then((res) => {
      const response = res.data;
      setBatchDetails(response);
    });
  };
  useEffect(() => {
    getBatchDetails();
  }, []);
  return batchDetails;
};

export default useBatchDetail;
