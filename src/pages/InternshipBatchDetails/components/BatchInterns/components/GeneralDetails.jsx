import {
  Avatar,
  Box,
  Button,
  Card,
  Drawer,
  Flex,
  Grid,
  SimpleGrid,
  Text,
} from "@mantine/core";
import {
  IconMan,
  IconPencil,
  IconReportMedical,
  IconFriends,
  IconBuilding,
  IconCalendarEvent,
  IconPhone,
  IconMap2,
} from "@tabler/icons-react";
import { EditGeneralDetailForm } from "./EditGeneralDetailForm";
import { useState } from "react";

const GeneralDetails = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  let title = "Edit Personal Details";

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
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
        <Card withBorder style={{ gridColumn: "1/3" }} radius="md">
          <Card.Section p={"md"} withBorder>
            <Flex>
              <Box fw={"bold"} ff={"Inter, sans-serif"}>
                Personal Details
              </Box>
              <Button
                variant="light"
                ml="auto"
                className="btn-sm"
                onClick={() => toggleDrawer()}
                leftSection={<IconPencil size={14} />}
              >
                Edit
              </Button>
            </Flex>
          </Card.Section>
          <SimpleGrid cols={3} mt="lg">
            <Flex gap={"md"}>
              <IconMan className="profile-icon" />
              <Box>
                <Text
                  fz={"14px"}
                  color="rgb(134, 142, 150)"
                  fw={"bold"}
                  ff={"Inter, sans-serif"}
                >
                  Gender
                </Text>
                <Text fz={"14px"} ff={"Inter, sans-serif"} fw={"bold"}>
                  Male
                </Text>
              </Box>
            </Flex>
            <Flex gap={"md"}>
              <IconCalendarEvent className="profile-icon" />
              <Box>
                <Text
                  fz={"14px"}
                  color="rgb(134, 142, 150)"
                  fw={"bold"}
                  ff={"Inter, sans-serif"}
                >
                  Birth Date
                </Text>
                <Text fz={"14px"} ff={"Inter, sans-serif"} fw={"bold"}>
                  07-08-1995{" "}
                </Text>
              </Box>
            </Flex>
            <Flex gap={"md"}>
              <IconReportMedical className="profile-icon" />
              <Box>
                <Text
                  fz={"14px"}
                  color="rgb(134, 142, 150)"
                  fw={"bold"}
                  ff={"Inter, sans-serif"}
                >
                  Blood Group
                </Text>
                <Text fz={"14px"} ff={"Inter, sans-serif"} fw={"bold"}>
                  A+
                </Text>
              </Box>
            </Flex>
          </SimpleGrid>
          <SimpleGrid cols={3} mt="lg">
            <Flex gap={"md"}>
              <IconFriends className="profile-icon" />
              <Box>
                <Text
                  fz={"14px"}
                  color="rgb(134, 142, 150)"
                  fw={"bold"}
                  ff={"Inter, sans-serif"}
                >
                  Marital Status
                </Text>
                <Text fz={"14px"} ff={"Inter, sans-serif"} fw={"bold"}>
                  Unmarried
                </Text>
              </Box>
            </Flex>
            <Flex gap={"md"}>
              <IconBuilding className="profile-icon" />
              <Box>
                <Text
                  fz={"14px"}
                  color="rgb(134, 142, 150)"
                  fw={"bold"}
                  ff={"Inter, sans-serif"}
                >
                  Reporting Office
                </Text>
                <Text fz={"14px"} ff={"Inter, sans-serif"} fw={"bold"}>
                  Valsad{" "}
                </Text>
              </Box>
            </Flex>
            <Flex gap={"md"}>
              <IconCalendarEvent className="profile-icon" />
              <Box>
                <Text
                  fz={"14px"}
                  color="rgb(134, 142, 150)"
                  fw={"bold"}
                  ff={"Inter, sans-serif"}
                >
                  Joining Date
                </Text>
                <Text fz={"14px"} ff={"Inter, sans-serif"} fw={"bold"}>
                  25-Oct-2021
                </Text>
              </Box>
            </Flex>
          </SimpleGrid>
          <SimpleGrid cols={1} mt="lg">
            <Flex gap={"md"}>
              <IconPhone className="profile-icon" />
              <Box>
                <Text
                  fz={"14px"}
                  color="rgb(134, 142, 150)"
                  fw={"bold"}
                  ff={"Inter, sans-serif"}
                >
                  Mobile Number
                </Text>
                <Text fz={"14px"} ff={"Inter, sans-serif"} fw={"bold"}>
                  9904503997
                </Text>
              </Box>
            </Flex>
          </SimpleGrid>
          <SimpleGrid cols={1} mt="lg">
            <Flex gap={"md"}>
              <IconMap2 className="profile-icon" />
              <Box>
                <Text
                  fz={"14px"}
                  color="rgb(134, 142, 150)"
                  fw={"bold"}
                  ff={"Inter, sans-serif"}
                >
                  Residential Address
                </Text>
                <Text fz={"14px"} ff={"Inter, sans-serif"} fw={"bold"}>
                  N/A
                </Text>
              </Box>
            </Flex>
          </SimpleGrid>
          <SimpleGrid cols={1} mt="lg">
            <Flex gap={"md"}>
              <IconMap2 className="profile-icon" />
              <Box>
                <Text
                  fz={"14px"}
                  color="rgb(134, 142, 150)"
                  fw={"bold"}
                  ff={"Inter, sans-serif"}
                >
                  Permanent Address
                </Text>
                <Text fz={"14px"} ff={"Inter, sans-serif"} fw={"bold"}>
                  N/A
                </Text>
              </Box>
            </Flex>
          </SimpleGrid>
        </Card>
        <Grid gutter="md">
          <Grid.Col>
            <Card withBorder radius="md">
              <Card.Section p={"md"} withBorder>
                <Flex>
                  <Box fw={"bold"} ff={"Inter, sans-serif"}>
                    Reporting Manager(s)
                  </Box>
                </Flex>
              </Card.Section>
              <SimpleGrid cols={1} mt="lg">
                <Flex gap={"md"}>
                  <Avatar radius="sm" color="cyan" size={50}>
                    JC
                  </Avatar>
                  <Box>
                    <Text fz={"14px"} fw={"bold"} ff={"Inter, sans-serif"}>
                      Jagdish Chaudhari
                    </Text>
                    <Text
                      fz={"12px"}
                      ff={"Inter, sans-serif"}
                      fw={"bold"}
                      color="rgb(134, 142, 150)"
                    >
                      Domain Lead
                    </Text>
                  </Box>
                </Flex>
              </SimpleGrid>
            </Card>
          </Grid.Col>
          <Grid.Col>
            <Card withBorder radius="md">
              <Card.Section p={"md"} withBorder>
                <Flex>
                  <Box fw={"bold"} ff={"Inter, sans-serif"}>
                    Domain Owner
                  </Box>
                </Flex>
              </Card.Section>
              <SimpleGrid cols={1} mt="lg">
                <Flex gap={"md"}>
                  <Avatar radius="sm" color="cyan" size={50}>
                    RP
                  </Avatar>
                  <Box>
                    <Text
                      fz={"14px"}
                      color="rgb(134, 142, 150)"
                      fw={"bold"}
                      ff={"Inter, sans-serif"}
                    >
                      1R-0139
                    </Text>
                    <Text fz={"14px"} ff={"Inter, sans-serif"} fw={"bold"}>
                      Revant Patel
                    </Text>
                  </Box>
                </Flex>
              </SimpleGrid>
            </Card>
          </Grid.Col>
        </Grid>
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
          timingFunction: "ease",
          transformOrigin: "center center",
        }}
      >
        <EditGeneralDetailForm
          // editFormId={editFormId}
          // setReload={setReload}
          closeDrawer={() => setDrawerClose()}
        />
      </Drawer>
    </Box>
  );
};

export default GeneralDetails;
