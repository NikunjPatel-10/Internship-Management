// Group values by domain in ascending order
export const groupedData = (records) => {
  records.sort((a, b) => {
    if (a.domain < b.domain) {
      return -1;
    } else if (a.domain > b.domain) {
      return 1;
    } else {
      return 0;
    }
  });

  return records.reduce((acc, data) => {
    if (!acc[data.domain]) {
      acc[data.domain] = [];
    }
    acc[data.domain].push(data);
    return acc;
  }, {});
};
