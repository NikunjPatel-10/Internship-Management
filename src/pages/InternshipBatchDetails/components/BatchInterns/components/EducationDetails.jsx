import { Box, Button, Card, Drawer, Flex, SimpleGrid } from "@mantine/core";
import { IconMoodEmpty, IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { EditEducationDetailForm } from "./EditEducationDetailForm";

const EducationDetails = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  let title = "Add Academic Details";

  //** toggle for open/close */
  const toggleDrawer = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  //** Drawer close for and field value */
  const setDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Box my="md">
      <SimpleGrid cols={{ base: 1, sm: 1 }} spacing="lg" pb={"md"}>
        <Card withBorder style={{ gridColumn: "1/3" }} radius="md">
          <Card.Section p={"md"} withBorder>
            <Flex>
              <Box fw={"bold"} ff={"Inter, sans-serif"}>
                Academic Details
              </Box>
              <Button
                variant="light"
                ml="auto"
                className="btn-sm"
                onClick={() => toggleDrawer()}
                leftSection={<IconPlus size={14} />}
              >
                Add
              </Button>
            </Flex>
          </Card.Section>
          <SimpleGrid mt="lg">
            <Flex
              style={{
                backgroundColor: "rgb(255, 245, 245)",
                border: "1px solid transparent",
                padding: "20px 16px",
                borderRadius: "4px",
              }}
            >
              <IconMoodEmpty color="rgb(250, 82, 82)"></IconMoodEmpty>
              <Box ml={"md"}>
                <Box
                  fw={700}
                  fz={"14px"}
                  ff={"Inter, sans-serif"}
                  style={{ color: "rgb(250, 82, 82)" }}
                >
                  Important Information
                </Box>
                <Box fz={"14px"} ff={"Inter, sans-serif"}>
                  Please add your academic details by clicking the "Add" button.
                </Box>
              </Box>
            </Flex>
          </SimpleGrid>
        </Card>
      </SimpleGrid>
      <SimpleGrid cols={{ base: 1, sm: 1 }} spacing="lg">
        <Card withBorder style={{ gridColumn: "1/3" }} radius="md">
          <Card.Section p={"md"} withBorder>
            <Flex>
              <Box fw={"bold"} ff={"Inter, sans-serif"}>
                Other Qualification Details
              </Box>
              <Button
                variant="light"
                ml="auto"
                className="btn-sm"
                onClick={() => toggleDrawer()}
                leftSection={<IconPlus size={14} />}
              >
                Add
              </Button>
            </Flex>
          </Card.Section>
          <SimpleGrid cols={1} mt="lg">
            <Flex
              style={{
                backgroundColor: "rgb(255, 245, 245)",
                border: "1px solid transparent",
                padding: "20px 16px",
                borderRadius: "4px",
              }}
            >
              <IconMoodEmpty color="rgb(250, 82, 82)"></IconMoodEmpty>
              <Box ml={"md"}>
                <Box
                  fw={700}
                  fz={"14px"}
                  ff={"Inter, sans-serif"}
                  style={{ color: "rgb(250, 82, 82)" }}
                >
                  Important Information
                </Box>
                <Box fz={"14px"} ff={"Inter, sans-serif"}>
                  Please add any additional qualifications or certifications you
                  may have acquired by clicking the "Add" button.
                </Box>
              </Box>
            </Flex>
          </SimpleGrid>
        </Card>
      </SimpleGrid>
      <Drawer
        className="form-drawer"
        opened={drawerOpen}
        ff={"Inter, sans-serif"}
        position="right"
        title={title}
        onClose={() => setDrawerClose()}
        overlayProps={{ backgroundOpacity: 0.6, blur: 5 }}
        size={500}
        styles={{
          title: { fontSize: '20px' , fontWeight:"bold"},content:{borderRadius:"8px 0 0 8px"},
          content: { display: "flex", flexDirection: "column", height: "100%" },
          body: { overflow: "hidden", height: "100%", padding: "0" },
        }}
        transitionProps={{
          transition: "scale",
          duration: 250,
          timingFunction: "linear",
          transformOrigin: "center center",
        }}
      >
        <EditEducationDetailForm
          // editFormId={editFormId}
          // setReload={setReload}
          closeDrawer={() => setDrawerClose()}
        />
      </Drawer>
    </Box>
  );
};

export default EducationDetails;
