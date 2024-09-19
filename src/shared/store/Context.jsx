import { createContext } from "react";

const InternshipContext = createContext({
  searchTerm: "",
  setSearchTerm: () => {},
  selectedDomains: [],
  setSelectedDomains: () => {},
});

export default InternshipContext;
