import {
  Grid,
  Card,
  Group,
  Table,
  Text,
  Box,
  Flex,
  Stack,
} from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import {
  getRoadMapData,
  updateRoadmap,
} from "../utility/service/Roadmap.service";
import { DropdownMenu } from "./DropdownMenu";
import { Link, useParams } from "react-router-dom";
import { IconFolderCode } from "@tabler/icons-react";
import useRoadmap from "../../../shared/hooks/useRoadmap";
import useFilterData from "../../../shared/hooks/useFilterData";
import InternshipContext from "../../../shared/store/Context";
import useSearch from "../../../shared/hooks/useSearch";
import NoRecordsFound from "../../../shared/common-components/NoRecordsFound";

export function RoadMapList() {
  const { roadmapId } = useParams();
  const roadmapData = useRoadmap();
  const [records, setRecords] = useState([]);
  const { selectedDomains, searchTerm } = useContext(InternshipContext);
  useEffect(() => {
    const filteredData = useFilterData(records, selectedDomains);
    setRecords(filteredData);
  }, [selectedDomains]);
  useEffect(() => {
    setRecords(roadmapData);
  }, [roadmapData]);
  const handleDeleteRecord = (id) => {
    setRecords(records.filter((record) => record.id !== id));
  };

  useEffect(() => {
    // Define the keys for searching
    const searchKeys = ["name", "domain"];

    // Use the useSearch hook with the roadmap data and searchKeys
    const filteredRoadmaps = useSearch(roadmapData, searchTerm, searchKeys);
    setRecords(filteredRoadmaps);
  }, [roadmapData, searchTerm]);

  const rows =
    records.length > 0 ? (
      records.map((tabData) => (
        <Grid.Col span={3} key={tabData.id}>
          <Card
            className="roadmap-folder"
            shadow="sm"
            padding="md"
            radius="md"
            withBorder
          >
            <Flex align="center">
              <Flex style={{flexShrink:"0",borderRadius: '6px'}} align={"center"} justify={"center"} w={38} h={38} bg={"#e7ecf6"} >
                <IconFolderCode color="#00488A"></IconFolderCode>
              </Flex>
              <Stack w="100%" gap="xs" ml="md">
                <Link
                  to={"/roadmap-details/" + tabData.id}
                  className="text-link"
                  style={{ fontSize: '14px' }} 
                >
                  {tabData.name}
                </Link>
                <Text fz={12} c={"#868e96"} fw={600} mt={-10} className="roadmap-domain"> {tabData.domain}</Text>
              </Stack>
              <DropdownMenu id={tabData.id} onDelete={handleDeleteRecord} />
            </Flex>
          </Card>
        </Grid.Col>
      ))
    ) : (
      <Grid.Col>
        <NoRecordsFound></NoRecordsFound>
      </Grid.Col>
    );
  return (
    <Grid pt="md" pb="md">
      {rows}
    </Grid>
  );
}
