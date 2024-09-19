import { useEffect, useState } from "react";
import { getDomain } from "../../pages/mentors/utility/services/mentors.service";
const useDomain = () => {
  const [domain, setDomain] = useState([]);
  /**
   * get all domain details
   * @returns - all domains with transformed values for displaying in dropdownmenu
   */
  const getDomains = async () => {
    await getDomain().then((res) => {
      const response = res.data;
      const transformedValues = response?.map((item) => ({
        id: item.id,
        value: item.name,
      }));
      const sortedData = transformedValues.sort((a, b) => {
        if (a.value < b.value) {
          return -1;
        }
        if (a.value > b.value) {
          return 1;
        }
        return 0;
      });
      setDomain(sortedData);
    });
  };
  useEffect(() => {
    getDomains();
  }, []);
  return domain;
};

export default useDomain;
