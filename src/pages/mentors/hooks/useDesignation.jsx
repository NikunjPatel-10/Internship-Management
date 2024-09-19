import { useEffect, useState } from "react";
import { getDesignation } from "../utility/services/mentors.service";
const useDesignation = () => {
  const [designation, setDesignation] = useState([]);
  /**
   * get all designation details
   * @returns - all designations with transformed values for displaying in dropdownmenu
   */
  const getDesignations = async () => {
    await getDesignation().then((res) => {
      const response = res.data;
      const transformedValues = response?.map((item) => ({
        id: item.id,
        value: item.name,
      }));
      setDesignation(transformedValues);
    });
  };
  useEffect(() => {
    getDesignations();
  }, []);
  return designation;
};

export default useDesignation;
