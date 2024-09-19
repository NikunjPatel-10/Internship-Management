import { Flex, Box, Container, Paper, Title, rem } from "@mantine/core";
import { Breadcrumb } from "../../shared/common-components/Breadcrumb";
import { Tabs } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BatchInterns } from "./components/BatchInterns/BatchInterns";
import { getByIdInternBatchData } from "../Intern-batch/utility/service/InternBatch.service";
import { BatchRoadmapList } from "./components/BatchRoadmap/components/BatchRoadmapList";
import BatchMentor from "./components/BatchMentor/BatchMentor";
import SearchBox from "../../shared/common-components/SearchBox";
import FilterPopover from "../../shared/common-components/FilterPopover";
import InternshipContext from "../../shared/store/Context";
export function InternshipBatchDetails() {
  let { batchId } = useParams();

  const [activeTab, setActiveTab] = useState("Interns");
  const [batchName, setBatchName] = useState();
  const { selectedDomains, setSelectedDomains, setSearchTerm } =
    useContext(InternshipContext);
  const items = [
    { title: "Internship", href: "#" },
    { title: "Intern-Batch", href: "/intern-batch" },
    { title: `${batchName}`, href: "#" },
  ];

  const handleDomainChange = (selected) => {
    setSelectedDomains(selected);
  };
  const handleTabChange = (newTab) => {
    // setSearchTerm("");
    setActiveTab(newTab);
  };
  useEffect(() => {
    getByIdInternBatchData(batchId).then((response) => {
      if (response) {
        setBatchName(response.data.batchname);
        localStorage.setItem("batch_name", `${batchName}`);
      }
    });
  });
  return (
    <Flex direction="column" className="content-wrapper">
      <Paper className="sub-header-paper">
        <Container className="container-fluid">
          <Flex justify="space-between" align="center" className="sub-header">
            <div>
              <Breadcrumb data={items} />
              <Title order={4} mt={5}> {batchName}</Title>
            </div>
            <Flex gap="sm">
              <FilterPopover
                selectedDomains={selectedDomains}
                onDomainChange={handleDomainChange}
              />
              <SearchBox placeholder={activeTab} />
            </Flex>
          </Flex>
        </Container>
        {/* Tab Container */}
      </Paper>
      <Paper className="container-bg">
        <Container className="container-fluid">
          <Flex direction={"column"} py={16} h={"100%"} className="tab-container">
            <Tabs
              h={"100%"}
              bg={"#fff"}
              value={activeTab}
              mih={"100%"}
              styles={{
                root: {
                  borderRadius: "8px",
                  border: '1px solid rgb(222, 226, 230)',
                },
              }}
              onChange={handleTabChange}
            >
              <Tabs.List>
                <Tabs.Tab h={50} px={32} py={14} fz={15} value="Interns">
                  Interns
                </Tabs.Tab>
                <Tabs.Tab h={50} px={32} py={14} fz={15} value="Mentors">
                  Mentors
                </Tabs.Tab>
                <Tabs.Tab h={50} px={32} py={14} fz={15} value="Roadmaps">
                  Roadmaps
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel h={"100%"} p={16} value="Interns">
                <BatchInterns />
              </Tabs.Panel>
              <Tabs.Panel h={"100%"} p={16} value="Mentors">
                <BatchMentor />
              </Tabs.Panel>
              <Tabs.Panel h={"100%"} p={16} value="Roadmaps">
                <BatchRoadmapList />
              </Tabs.Panel>
            </Tabs>
          </Flex>
        </Container>
      </Paper>
    </Flex>
  );
}
