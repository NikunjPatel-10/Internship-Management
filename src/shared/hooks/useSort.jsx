import { useEffect, useState } from 'react';

const useSort = (data, initialSortColumn, initialSortDirection) => {
  const [sortedData, setSortedData] = useState([]);
  const [sortColumn, setSortColumn] = useState(initialSortColumn);
  const [sortDirection, setSortDirection] = useState(initialSortDirection);

  useEffect(() => {
    const sorted = [...data].sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (a[sortColumn] > b[sortColumn]) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setSortedData(sorted);
  }, [data, sortColumn, sortDirection]);

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const handleSortColumn = (column) => {
    if (column === sortColumn) {
      toggleSortDirection();
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  return {
    sortedData,
    sortColumn,
    sortDirection,
    handleSortColumn,
    toggleSortDirection,
  };
};

export default useSort;
