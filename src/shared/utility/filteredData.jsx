// Filter Records based on batchId
export const filteredData = (response, batchId) =>
  response.filter((record) => record.batchId == batchId);
