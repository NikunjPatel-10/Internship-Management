import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import useRoadmapDetails from "../../../shared/hooks/useRoadmapDetails";
import { Badge, Container, Flex, Paper, Select, Table, Title } from "@mantine/core";
import { Breadcrumb } from "../../../shared/common-components/Breadcrumb";
import { getBatchRoadmapById, updateBatchRoadmap } from "../../InternshipBatchDetails/components/BatchRoadmap/services/BatchRoadmap.service";


export default function TopicsDetailsList() {
  // Receive data from the URL
  const location = useLocation();
  const [data] = location.state;

  // Handle Submit
  const handleSelectChange = (value, id) => {
    
    // Initialize counters for different statuses
    let notStartedCount = 0;
    let inProgressCount = 0;
    let completedCount = 0;

    const subTopics = [...data.subTopics];
    console.log(subTopics);
    const selectedSubTopicIndex = subTopics.findIndex(
      (subTopic) => subTopic.id === id
    );
    console.log("Index is", selectedSubTopicIndex);
    subTopics[selectedSubTopicIndex].status = value;
    const copyData = data;

    // Loop over subtopics array of current main object
    subTopics.forEach(subTopic => {
      // Count occurrences of different statuses
      switch (subTopic.status) {
        case 'Not Started':
          notStartedCount++;
          break;
        case 'In Progress':
          inProgressCount++;
          break;
        case 'Completed':
          completedCount++;
          break;
        default:
          break;
      }
    });

    if (completedCount === subTopics.length) {
      copyData.status = 'Completed';
    } else if (inProgressCount > 0) {
      copyData.status = 'In Progress';
    } else if (notStartedCount > 0) {
      copyData.status = 'Not Started';
    }
  
    copyData.subTopics = subTopics;
    console.log(copyData)

    updateBatchRoadmap(
      copyData.id,
      copyData
    ).then(() => {
      getBatchRoadmapById(copyData.id);
    });

    console.log(notStartedCount, inProgressCount, completedCount);
  };

  // Breadcrumbs
  const Breadcrumbitems = [
    { title: "Internship", href: "#" },
    { title: "Training Tracker", href: "/tracker" },
    { title: `${data.topic}` },
  ];
  // console.log(batchRoadmapData);
  const rows = data.subTopics.map((data) => (
    <Table.Tr key={data.id}>
      <Table.Td>{data.title}</Table.Td>
      <Table.Td>{data.subtopics}</Table.Td>
      <Table.Td>{data.duration}</Table.Td>
      <Table.Td>
        <Select
          data={["Not Started", "Completed", "In Progress"]}
          value={data.status || ""}
          onChange={(value) => handleSelectChange(value, data.id)}
          placeholder="Select status"
          size="sm"
        />
      </Table.Td>
    </Table.Tr>
  ))
  return (
    <Flex direction="column" className="content-wrapper">
      <Paper className="sub-header-paper">
        <Container className="container-fluid">
          <Flex justify="space-between" align="center" className="sub-header">
            <div>
              <Breadcrumb data={Breadcrumbitems} />
              <Title order={4} mt={5}>{data.topic}</Title>
            </div>
          </Flex>
        </Container>
      </Paper>
      <Paper className="container-bg">
        <Container className="container-fluid">
          <div className="content-wrapper">
            <div className="table-container">
              <Table highlightOnHover withTableBorder withColumnBorders mt="md">
                <Table.Thead bg="#f1f3f5">
                  <Table.Tr>
                    <Table.Th>TOPIC</Table.Th>
                    <Table.Th>SUB-TOPIC</Table.Th>
                    <Table.Th>DURATION</Table.Th>
                    <Table.Th>STATUS</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody bg={"#fff"}>{rows}</Table.Tbody>
              </Table>
            </div>
          </div>
        </Container>
      </Paper>
    </Flex>
  );
}
