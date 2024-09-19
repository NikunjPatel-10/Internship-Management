import {
  Badge,
  Table,
  Flex,
  Button,
  Text,
  Paper,
  Container,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
// import { getRoadmapById, updateRoadmap } from "../../service/Roadmap.service";
import { DropdownMenu } from "./DropdownMenu";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "../../../../shared/common-components/Breadcrumb";
import { IconPlus } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { getRoadMapDetails } from "../utility/service/RoadmapDetails.service";
import useRoadmapDetails from "../../../../shared/hooks/useRoadmapDetails";

function RoadmapDetailsTable() {
  const { roadmapId } = useParams();
  const [records, setRecords] = useState([]);
  const roadmapDetailsData = useRoadmapDetails();

  useEffect(() => {
    setRecords(
      roadmapDetailsData.filter((record) => record.roadmapId == roadmapId)
    );
  }, [roadmapDetailsData]);

  const handleDeleteRecord = (roadmapId) => {
    // user.topics = user.topics.filter((record) => record.id !== deleteId);
    const newRecords = records.filter((record) =>
      record.topics.filter((data) => data.id !== roadmapId)
    );
    setRecords(newRecords);
  };
  const Breadcrumbitems = [
    { title: "Internship", href: "#" },
    { title: "Roadmap", href: "/roadmap" },
    { title: "Roadmap Details", href: "#" },
  ];

  // Creating Table Rows
  const renderTableRows = () => {
    let rows = [];
    records.forEach((user, index) => {
      const rowspan = user.topics.length;

      user.topics.forEach((topic, topicIndex) => {
        rows.push(
          <Table.Tr key={`${user.id}_${topicIndex}`}>
            {topicIndex === 0 ? (
              <Table.Td style={{textWrap:"nowrap"}} className="day" rowSpan={rowspan}>
                {user.day}
              </Table.Td>
            ) : null}

            <Table.Td style={{textWrap:"nowrap"}} fw={500} className="topic-name">{topic.topicName}</Table.Td>
            <Table.Td className="subtopic-name">{topic.subtopic}</Table.Td>
            <Table.Td className="duration">{topic.duration}</Table.Td>
            <Table.Td>
              <DropdownMenu
                user={user}
                deleteId={topic.id}
                onDelete={handleDeleteRecord}
                duration={topic.duration}
              />
            </Table.Td>
          </Table.Tr>
        );
      });
    });
    return rows;
  };

  return (
    <Flex direction="column" className="content-wrapper">
      <Paper className="sub-header-paper">
        <Container className="container-fluid">
          <Flex justify="space-between" align="center" className="sub-header">
            <div>
              <Breadcrumb data={Breadcrumbitems} />
              <Title order={4} mt={5}>Roadmap Details</Title>
            </div>
            <Link to="add/new-details">
              <Button leftSection={<IconPlus size={14} />}>
                Add Roadmap Details
              </Button>
            </Link>
          </Flex>
        </Container>
      </Paper>
      <Paper className="container-bg">
        <Container className="container-fluid">
          <div className="table-container">
            <Table
              className="roadmapDetail-table"
              stickyHeader
              stickyHeaderOffset={-16}
              highlightOnHover
              withTableBorder
              withColumnBorders
              mt="md"
            >
              <Table.Thead bg="#f1f3f5">
                <Table.Tr>
                  <Table.Th>DAY</Table.Th>
                  <Table.Th>TOPIC</Table.Th>
                  <Table.Th>SUB-TOPIC</Table.Th>
                  <Table.Th>DURATION</Table.Th>
                  <Table.Th></Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody bg={"#fff"}>
                {records.length == 0 ? (
                  <Table.Tr>
                    <Table.Td colSpan="5">
                      <Text ta="center"> No Records Found</Text>
                    </Table.Td>
                  </Table.Tr>
                ) : (
                  <>{renderTableRows()}</>
                )}
              </Table.Tbody>
            </Table>
          </div>
        </Container>
      </Paper>
    </Flex>
  );
}

export default RoadmapDetailsTable;
