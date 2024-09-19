import { Button, Flex, Table, Text, Drawer } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBatchRoadMap } from "../services/BatchRoadmap.service";
import { DropdownMenu } from "./DropdownMenu";
import { useDisclosure } from "@mantine/hooks";
import AddBatchRoadmapForm from "./AddBatchRoadmapForm";
import useBatchRoadmap from "../../../../../shared/hooks/useBatchRoadmap";
import InternshipContext from "../../../../../shared/store/Context";
import useSearch from "../../../../../shared/hooks/useSearch";
import { AccordionUI } from "../../../../../shared/common-components/AccordionUI";
import { groupedData } from "../../../utility/groupedData";
import useFilterData from "../../../../../shared/hooks/useFilterData";

export function BatchRoadmapList() {
  const { batchId, id } = useParams();
  const [records, setRecords] = useState([]);
  const [refresh, setRefresh] = useState({});
  const [getBatchRoadmapDetails,batchRoadmapData] = useBatchRoadmap(batchId);
  const [opened, { open, close }] = useDisclosure(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen((prevState) => !prevState);
  };
  const { searchTerm, selectedDomains } = useContext(InternshipContext);

  const title = id ? "Update Roadmap Detail" : "Add Roadmap Detail";

  useEffect(() => {
    setRecords(batchRoadmapData);
    console.log("Getting Data of batchroadmap")
  }, [batchRoadmapData]);
  // Group mentors by domain
  useEffect(() => {
    // Define the keys for searching
    const searchKeys = ["topic", "domain", "mentor", "duration"];
    // Use the useSearch hook with the modified data and searchKeys
    const filterRoadmaps = useSearch(records, searchTerm, searchKeys);
    setRecords(filterRoadmaps);
  }, [searchTerm]);

  useEffect(() => {
    const filteredData = useFilterData(records, selectedDomains);
    setRecords(filteredData);
  }, [selectedDomains]);
  const groupedRoadmap = groupedData(records);

  return (
    <Flex direction="column">
      <Flex>
        {/* <Link style={{ marginLeft: "auto" }} to="addRoadmap/new"> */}
        <Button
          //   onClick={open}
          onClick={toggleDrawer}
          className="btn-sm"
          variant="light"
          mb={14}
          ml="auto"
          leftSection={<IconPlus size={14} />}
        >
          Add
        </Button>
        {/* </Link> */}
      </Flex>
      <div>
        {records.length == 0 ? (
          <Text ta="center"> No Records Found</Text>
        ) : (
          <AccordionUI
            tabValue="roadmap"
            data={groupedRoadmap}
            toggleDrawer={toggleDrawer}
            getData={getBatchRoadmapDetails} 
          />
        )}
      </div>
      <Drawer
        className="form-drawer"
        opened={drawerOpen}
        position="right"
        onClose={() => setDrawerOpen(false)}
        title={title}
        overlayProps={{ backgroundOpacity: 0.6, blur: 5 }}
        size={500}
        styles={{ title: {fontSize: '20px' , fontWeight:"bold"} ,content:{borderRadius:"8px 0 0 8px"}}}
        transitionProps={{
          transition: "scale",
          duration: 250,
          timingFunction: "ease",
          transformOrigin: "center center",
        }}
      >
        <AddBatchRoadmapForm
          closeDrawer={() => setDrawerOpen(false)}
          setRefresh={setRefresh}
          getData = {getBatchRoadmapDetails}
        />
      </Drawer>
    </Flex>
  );
}
