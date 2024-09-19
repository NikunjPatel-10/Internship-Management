import { Table, Badge, Paper, Container } from "@mantine/core";
import { DropdownMenu } from "./DropdownMenu";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useInternBatch } from "../hooks/useInternBatch";
import InternshipContext from "../../../shared/store/Context";
import useSearch from "../../../shared/hooks/useSearch";
import NoRecordsFound from "../../../shared/common-components/NoRecordsFound";

export function InternsBatchTable() {
  const [records, setRecords] = useState([]);
  const [refresh, setRefresh] = useState({});
  const BatchData = useInternBatch(refresh);
  const { searchTerm, setSearchTerm } = useContext(InternshipContext);

  const getInternBatchList = () => {
    setRecords(BatchData);
  };

  useEffect(() => {
    // search keys
    const searchKeys = [
      "batchname",
      "formattedStartDate",
      "formattedEndDate",
      "status",
    ];
    // formatted data for start date and end date
    const formattedData = BatchData.map((item) => ({
      ...item,
      formattedStartDate: formatDateString(item.startdate),
      formattedEndDate: formatDateString(item.enddate),
    }));
    // Use the useSearch hook with the modified data and searchKeys
    const filteredBatch = useSearch(formattedData, searchTerm, searchKeys);
    setRecords(filteredBatch);
  }, [searchTerm]);

  useEffect(() => {
    if (BatchData) {
      getInternBatchList();
    }
  }, [BatchData]);

  const formatDateString = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  const rows =
    records.length > 0 ? (
      records.map((tabData) => (
        <Table.Tr key={tabData.id}>
          <Table.Td>
            <Link
              style={{ textTransform: "uppercase" }}
              className="text-link"
              to={`/intern-batch/details/${tabData.id}`}
              onClick={() => setSearchTerm("")}
            >
              {tabData.batchname}
            </Link>
          </Table.Td>
          <Table.Td>{formatDateString(tabData.startdate)}</Table.Td>
          <Table.Td>{formatDateString(tabData.enddate)}</Table.Td>
          <Table.Td>
            <Badge
              variant={
                tabData.status === "Not-Started"
                  ? "notStarted"
                  : tabData.status === "Completed"
                  ? "completed"
                  : "inProgress"
              }
              radius="sm"
            >
              {tabData.status}
            </Badge>
          </Table.Td>
          <Table.Td>
            {<DropdownMenu setRefresh={setRefresh} id={tabData.id} />}
          </Table.Td>
        </Table.Tr>
      ))
    ) : (
      <Table.Tr>
        <Table.Td p="0" colSpan="5">
          <NoRecordsFound></NoRecordsFound>
        </Table.Td>
      </Table.Tr>
    );
  return (
    <div className="content-wrapper">
      <Paper className="container-bg">
        <Container className="container-fluid">
          <div className="table-container">
            <Table
              className="internshipBatchTable"
              highlightOnHover
              withTableBorder
              withColumnBorders
              mt="md"
            >
              <Table.Thead bg="#f1f3f5">
                <Table.Tr>
                  <Table.Th>BATCH-NAME</Table.Th>
                  <Table.Th>START-DATE</Table.Th>
                  <Table.Th>END-DATE</Table.Th>
                  <Table.Th>STATUS</Table.Th>
                  <Table.Th></Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody bg={"#fff"}>{rows}</Table.Tbody>
            </Table>
          </div>
        </Container>
      </Paper>
    </div>
  );
}
