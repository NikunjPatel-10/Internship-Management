import React, { useEffect, useRef, useState } from "react";
import {
  Flex,
  Table,
  Box,
  Text,
  Center,
  SegmentedControl,
  rem,
  Tooltip,
  Select,
  Container,
  Paper,
  Title,
  Drawer,
  UnstyledButton,
  ScrollArea,
  Divider,
} from "@mantine/core";
import { Breadcrumb } from "../../shared/common-components/Breadcrumb";
import useDomain from "../../shared/hooks/useDomain";
import useBatchRoadmap from "../../shared/hooks/useBatchRoadmap";
import useRoadmapDetails from "../../shared/hooks/useRoadmapDetails";
import {
  IconChevronDown,
  IconLayoutBottombarCollapse,
  IconLayoutNavbarCollapse,
} from "@tabler/icons-react";
import useBatchDetail from "../../shared/hooks/useBatchDetails";
import { Link, unstable_HistoryRouter, useNavigate } from "react-router-dom";
import EditTopicDetails from "./components/EditTopicDetails";
import { useDisclosure } from "@mantine/hooks";
import { eachDayOfInterval, format, formatDate, isSameDay, isSaturday, isSunday, isToday } from "date-fns";

export default function TrainingTracker() {
  // Ref for the table element
  const tableRef = useRef(null);
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen((prevState) => !prevState);
  };
  const closeDrawer = () => {
    setDrawerOpen(false);
    navigate("/tracker");
  }
  // Get Batch Details
  const batchDetails = useBatchDetail();
  // Get the List of current active batch
  const currentActiveBatch = batchDetails
    .filter((data) => data.status == "In Progress")
    .map((batch) => batch);

  // States
  const [view, setView] = useState("collapsed");
  const [selectedValue, setSelectedValue] = useState("");

  const [activeBatchId, setActiveBatchId] = useState();
  const [batchStartDate, setBatchStartDate] = useState();
  const [batchEndDate, setBatchEndDate] = useState();
  const [filteredData, setFilteredData] = useState();
  const [roadmapData, setRoadmapData] = useState();

  useEffect(() => {
    if (currentActiveBatch.length > 0) {
      setSelectedValue(currentActiveBatch[0]?.batchname);
      setActiveBatchId(currentActiveBatch[0]?.id);
      setBatchStartDate(currentActiveBatch[0]?.startdate);
      setBatchEndDate(currentActiveBatch[0]?.enddate);
    }
  }, [batchDetails]);

  // To get all Domains
  const domains = useDomain();

  // To get Roadmap Data of particular batch
  const [getBatchRoadmapDetails, batchRoadmapData] = useBatchRoadmap(activeBatchId);

  // To get Roadmap details data for expanded view
  const roadmapDetailsData = useRoadmapDetails();

  // Handle change on select batch from dropdown
  const handleChange = (value) => {
    setSelectedValue(value);
    const currentBatch = batchDetails
      .filter((data) => data.status == "In Progress")
      .find((batch) => batch.batchname === value);
    // Set Date on basis of select value from dropdown
    setActiveBatchId(currentBatch.id);
    setBatchStartDate(currentBatch.startdate);
    setBatchEndDate(currentBatch.enddate);
  };
  // useEffect to update data when the active batch ID changes
  // Filter data according to current selected batch
  useEffect(() => {
    const filteredData = batchRoadmapData.filter(
      (data) => data.batchId == activeBatchId
    );
    // Update filteredData state with the new data
    setFilteredData(filteredData);
  }, [activeBatchId, batchRoadmapData]);

  // Breadcrumbs
  const Breadcrumbitems = [
    { title: "Internship", href: "#" },
    { title: "Training Tracker", href: "#" },
  ];

  function generateDateRange(startDateStr, endDateStr) {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    const datesBetween = eachDayOfInterval({ start: startDate, end: endDate });
    // Find today's date from the array of dates
    const today = datesBetween.find(date => isToday(date));
    console.log("Today is :", today);
    // Provide the List of Holidays here
    const holidayList = ["May 09 2024", "May 08 2024"]
    // Filter out Saturdays, Sundays and Holiday's
    const filteredDates = datesBetween.filter(date => !isSaturday(date) && !isSunday(date) && !holidayList.some(holiday => isSameDay(date, holiday)));

    return filteredDates;
  }
  // Array of Dates and Days
  const dateRange = generateDateRange(batchStartDate, batchEndDate);

  const days = dateRange.map((date, index) => {
    const day = String(index + 1).padStart(2, "0"); // Incrementing the day counter
    return `day ${day}`;
  });
  // Get today's date
  const today = new Date();
  console.log("Today is:", formatDate(today, "dd/MM/yyy"));
  // Scroll to today's date on component mount
  useEffect(() => {
    if (tableRef.current) {
      // Get height of table
      const tableHeight = tableRef.current.clientHeight;
      const root = document.documentElement;
      root.style.setProperty('--before-height', `${tableHeight + 14}px`);  // Added 14 to manage the height of table

      // Get today's date element
      const todayCell = tableRef.current.querySelector(`p[data-date="${formatDate(today, "dd/MM/yyy")}"]`);
      if (todayCell) {
        todayCell.classList.add("today-marker");
        // Behavior sets the scrolling behaviour, block set vertical alignment and  Inline sets horizontal alignment of scrolling element
        todayCell.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
      else {

      }
    }
  }, [today]);

  // Tracker Data for Collapsed view
  const rowCollapsed = domains.map((domain, index) => (
    <Table.Tr key={index}>
      <Table.Td className="sticky-cell">{domain.value}</Table.Td>
      <Table.Td h={65} style={{ display: "flex", alignItems: "center", padding: "0" }} key={index}>
        {filteredData &&
          filteredData.map((data, index) =>
            data.domain === domain.value ? (
              <Box
                className="tracker-column" px={4}
                style={{ width: `${160 * data.day}px` }}
              >
                <Link className={`topic-section ${data.status === "Not Started"
                  ? "not-started"
                  : data.status === "In Progress"
                    ? "in-progress"
                    : "completed"
                  }`}
                  style={{ margin: '4px' }}
                  to={{ pathname: `${data.id}` }}
                  state={[data]}>
                  {data.topic}
                </Link>

              </Box>
            ) : null
          )}
      </Table.Td>
    </Table.Tr>
  ));

  // Tracker Data for Detailed view
  const rowExpanded = domains.map((domain, index) => (
    <Table.Tr key={index}>
      <Table.Td className="sticky-cell">{domain.value}</Table.Td>
      <Table.Td className="trackerData" h={"max-content"} mih={60} style={{ display: "flex", alignItems: "flex-start", padding: "0" }} key={index}>
        {filteredData.map((data, index0) =>
          data.domain === domain.value
            ? roadmapDetailsData.map((roadmapData, index1) =>
              roadmapData.roadmapId == data.roadmapId ? (
                <Flex
                  direction="column"
                  className="tracker-column"
                  style={{ width: "200px" }} pl={4}
                >
                  {console.log("Data is:", data)}
                  {data.subTopics.map((topic, index) =>
                    topic.day == parseInt(roadmapData.day.match(/\d+/)[0]) ? (
                      <UnstyledButton py={8} px={5} m={4} fz={14}
                        title={topic.title}
                        style={{ borderWidth: '1px 1px 1px 4px', borderStyle: 'solid' }}
                        onClick={() => {
                          setRoadmapData({ data, topicId: topic.id })
                          toggleDrawer();
                        }}
                        className={`topic-section ${topic.status === "Not Started"
                          ? "not-started" : topic.status === "In Progress"
                          ? "in-progress" : "completed"}`}
                      >
                        {topic.title}
                      </UnstyledButton>
                    ) : null
                  )}
                </Flex>
              ) : null
            )
            : null
        )}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Flex direction="column" className="content-wrapper">
      <Paper className="sub-header-paper">
        <Container className="container-fluid">
          <Flex justify="space-between" align="center" className="sub-header">
            <div>
              <Breadcrumb data={Breadcrumbitems} />
              <Title order={4} mt={5}>Training Tracker</Title>
            </div>
            <Flex>
              {/* Select dropdown to select active btach */}
              <Select
                mr="md"
                placeholder="Select Batch"
                checkIconPosition="right"
                data={currentActiveBatch.map((batch) => batch.batchname)}
                value={selectedValue}
                onChange={handleChange}
                maxDropdownHeight={200}
                rightSection={
                  <IconChevronDown
                    style={{ width: rem(16), height: rem(16) }}
                  />
                }
              />
              {/* Toggle View Expanded/Collapsed */}
              <Tooltip
                position="bottom-end"
                label="Switch between collapsed/expanded view"
              >
                <SegmentedControl
                  className="view-toggle"
                  value={view}
                  display={"inline-flex"}
                  radius={4}
                  bg={"transparent"}
                  p={0}
                  h={34}
                  onChange={setView}
                  style={{ border: "1px solid rgb(222, 226, 230)" }}
                  color="#005ba9"
                  data={[
                    {
                      value: "collapsed",
                      label: (
                        <Center style={{ gap: 10 }}>
                          <IconLayoutNavbarCollapse
                            style={{ width: rem(16), height: rem(16) }}
                          />
                        </Center>
                      ),
                    },
                    {
                      value: "expanded",
                      label: (
                        <Center style={{ gap: 10 }}>
                          <IconLayoutBottombarCollapse
                            style={{ width: rem(16), height: rem(16) }}
                          />
                        </Center>
                      ),
                    },
                  ]}
                />
              </Tooltip>
            </Flex>
          </Flex>
        </Container>
      </Paper>
      {/* Tracker UI */}
      <Paper m={16} className="container-bg">
        <Container p={0} className="container-fluid">
          <Flex w={"100%"} h={"100%"} py={24} className="timeline-wrapper">
            <Box className="table-scroll">

              <Table
                stripedColor="red"
                className={
                  view == "collapsed"
                    ? "timeline-table"
                    : "timeline-table expanded"
                }
                stickyHeader
                stickyHeaderOffset={0}
                ref={tableRef}
              >
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th className="sticky-cell">Domains</Table.Th>
                    <Table.Th bg={"#ebebeb"}>
                      <Flex>
                        {dateRange.map((date, index) => (
                          <Box className="tracker-column">
                            <Text
                              fw={500}
                              ta="center"
                              size="sm"
                              mb={4}
                              tt="capitalize"> {days[index]}</Text>
                            <Text
                              ta="center"
                              size="xs"
                              tt="capitalize"
                              data-date={formatDate(date, "dd/MM/yyy")}
                            >
                              {format(date, 'dd/MM/yyyy')}
                            </Text>

                          </Box>
                        ))}
                      </Flex>
                    </Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {view == "collapsed" ? rowCollapsed : rowExpanded}
                </Table.Tbody>
              </Table>
            </Box>
          </Flex>
        </Container>
      </Paper>
      {/* Drawer */}
      <Drawer
        className="form-drawer"
        opened={drawerOpen}
        position="right"
        // onClose={() => setDrawerOpen(false)}
        onClose={closeDrawer}
        title="Edit Details"
        overlayProps={{ backgroundOpacity: 0.6, blur: 5 }}
        size={500}
        styles={{
          title: { fontSize: '20px', fontWeight: "bold" }, content: { borderRadius: "8px 0 0 8px" },
          body: { padding: 0 },
          header: { padding: '24px 24px 0px', marginBottom: '24px' }
        }}
        transitionProps={{
          transition: "scale",
          duration: 250,
          timingFunction: "ease",
          transformOrigin: "center center",
        }}
      >
        <EditTopicDetails
          closeDrawer={closeDrawer}
          roadmapData={roadmapData}

        // getData = {getBatchRoadmapDetails}
        />
      </Drawer>
    </Flex>
  );
}
