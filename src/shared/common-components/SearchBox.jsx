import React, { useContext, useEffect } from "react";
import { Input } from "@mantine/core";
import InternshipContext from "../store/Context";
import { IconCross, IconSearch } from "@tabler/icons-react";

const SearchBox = ({ placeholder }) => {
  const { setSearchTerm, searchTerm } = useContext(InternshipContext); // Access setSearchTerm and searchTerm from the context

  /**
   * Handler to update search term in the context
   * @param {string} value - Search term value
   */
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  /**
   * Handler to clear search term and reset search results
   */
  useEffect(() => {
    setSearchTerm("");
  }, [placeholder]);

  return (
    <Input
      leftSection={<IconSearch color="#000" size={16} />}
      placeholder={`Search ${placeholder}`}
      value={searchTerm}
      onChange={handleInputChange}
    />
  );
};

export default SearchBox;
