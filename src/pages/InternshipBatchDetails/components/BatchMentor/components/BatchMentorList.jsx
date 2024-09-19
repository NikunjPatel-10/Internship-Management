import React, { useContext, useEffect, useState } from "react";
import useBatchMentor from "../hooks/useBatchMentor";
import { Text } from "@mantine/core";
import { useParams } from "react-router";
import InternshipContext from "../../../../../shared/store/Context";
import useSearch from "../../../../../shared/hooks/useSearch";
import { AccordionUI } from "../../../../../shared/common-components/AccordionUI";
import { groupedData } from "../../../utility/groupedData";
import useFilterData from "../../../../../shared/hooks/useFilterData";
import NoRecordsFound from "../../../../../shared/common-components/NoRecordsFound";
const BatchMentorList = ({getMentorData, batchMentorData,toggleDrawer, refreshList }) => {
  // get param value from URL
  const { batchId } = useParams();
  // set mentors details for selected batch
  const [records, setRecords] = useState([]);
  const [refresh, setRefresh] = useState({});
  // get mentor data for selected batch
  
  const { searchTerm, selectedDomains } = useContext(InternshipContext);

  useEffect(() => {
    setRecords(batchMentorData);
  }, [batchMentorData]);

  useEffect(() => {
    setRefresh(refreshList);
  }, [refreshList]);

  useEffect(() => {
    // Define the keys for searching
    const searchKeys = ["mentor", "email", "domain"];
    // Use the useSearch hook with the modified data and searchKeys
    const filteredMentors = useSearch(records, searchTerm, searchKeys);
    setRecords(filteredMentors);
  }, [searchTerm]);
  useEffect(() => {
    const filteredData = useFilterData(records, selectedDomains);
    setRecords(filteredData);
  }, [selectedDomains]);
  // Group mentors by domain
  const groupedMentors = groupedData(records);

  return (
    <>
      {records.length == 0 ? (
        <NoRecordsFound></NoRecordsFound>
      ) : (
        <AccordionUI
          tabValue="mentors"
          data={groupedMentors}
          toggleDrawer={toggleDrawer}
          getData={getMentorData}
        />
      )}
    </>
  );
};

export default BatchMentorList;
