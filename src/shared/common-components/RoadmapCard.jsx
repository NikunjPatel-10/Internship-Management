import React from "react";
import { Box, Card, Flex, Stack, Text, Title, Group } from "@mantine/core";
import { IconFolderCode } from "@tabler/icons-react";
import { DropdownMenu } from "../../pages/InternshipBatchDetails/components/BatchRoadmap/components/DropdownMenu";
import { Link } from "react-router-dom";
const RoadmapCard = ({ data, openDrawer, roadmapData }) => {
  return (
    <Card
      className="roadmap-folder"
      shadow="sm"
      padding="md"
      radius="md"
      withBorder
      key={data.id}
    >
      <Flex align="center">
        <Flex style={{ flexShrink: "0", borderRadius: '6px' }} align={"center"} justify={"center"} w={38} h={38} bg={"#e7ecf6"} >
          <IconFolderCode color="#00488A"></IconFolderCode>
        </Flex>
        <Stack w="100%" gap="sm" ml="md">
          <Group gap="xs">
            <Link className="text-link" style={{ fontSize: '14px' }}
              to={{
                pathname: `/tracker/${data.id}`,
              }}
              state={[data]}
            >
              <Title order={6}>{data.topic}</Title>
            </Link>
            <Text size="sm">({data.duration})</Text>
          </Group>
          <Text fz={12} c={"#868e96"} fw={600} mt={-10} className="roadmap-domain"> {data.mentor}</Text>
        </Stack>
        <DropdownMenu id={data.id} openDrawer={openDrawer} getData={roadmapData} />
      </Flex>
    </Card>
  );
};

export default RoadmapCard;
