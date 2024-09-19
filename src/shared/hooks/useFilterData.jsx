/**
 * for searchdata
 * @param {*} data - data on which filter is performed
 * @param {*} filterCriteria - selected criteria using filter in performed
 * @returns filtered data
 */
const useFilterData = (data, filterCriteria) => {
  if (!filterCriteria || filterCriteria.length === 0) {
    // If no filter criteria or all criteria are cleared, return the original data
    return data;
  } else {
    // Filter the data based on the provided filter criteria
    return data.filter((item) => filterCriteria.includes(item.domain));
  }
  // },

  // return data; // Return the original data if no filter is applied
};

export default useFilterData;
