import { Flex, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import BatchInternList from "./components/BatchInternList";
import { useState } from "react";

export const BatchInterns = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  //** set value of drawer */
  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <Flex direction="column">
      <Flex justify="end" align="center">
        <Button
          variant="light"
          ml="auto"
          mb={14}
          className="btn-sm"
          onClick={() => setDrawerOpen(true)}
          leftSection={<IconPlus size={14} />}
        >
          Add
        </Button>
      </Flex>
      <BatchInternList openDrawer={drawerOpen} closeDrawer={closeDrawer} />
    </Flex>
  );
};
