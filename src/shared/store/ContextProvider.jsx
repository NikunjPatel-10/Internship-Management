import React, { useState } from "react";
import InternshipContext from "./Context";
const InternshipProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomains, setSelectedDomains] = useState([]);
  return (
    <InternshipContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        selectedDomains,
        setSelectedDomains,
      }}
    >
      {children}
    </InternshipContext.Provider>
  );
};

export default InternshipProvider;
