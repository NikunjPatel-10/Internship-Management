import React, { useState } from "react";
import BatchMentorList from "./components/BatchMentorList";
import { Button, Flex } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useParams } from "react-router";
import DrawerElement from "./components/DrawerElement";
import useBatchMentor from "./hooks/useBatchMentor";

const BatchMentor = () => {
  // get param value from URL
  const { id,batchId } = useParams();
  // Manage drawer open/close
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [getAllBatchMentor, batchMentorData] = useBatchMentor(batchId);
  // toggle drawer
  const toggleDrawer = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  //   set title of form
  const title = id ? "Update Mentor Detail" : "Add Mentor Detail";

  return (
    <Flex direction="column">
      <Flex>
        {/* Button to open drawer to add mentor into batch */}
        <Button
          onClick={toggleDrawer}
          className="btn-sm"
          variant="light"
          ml="auto"
          mb={14}
          leftSection={<IconPlus size={14} />}
        >
          Add
        </Button>
      </Flex>
      <div>
        {/* Component to list Mentorlist of selected batch */}
        <BatchMentorList getMentorData={getAllBatchMentor} batchMentorData={batchMentorData} toggleDrawer={toggleDrawer} refreshList={refresh} />
      </div>
      {/* Drawer component */}
      <DrawerElement
        title={title}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        getData={getAllBatchMentor}
      />
    </Flex>
  );
};

export default BatchMentor;
