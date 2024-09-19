// import Tables from "./components/table";
import { RoadMapList } from "./components/RoadmapList";
import { Flex, Button, Paper, Container, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconPlus } from "@tabler/icons-react";
import { Breadcrumb } from "../../shared/common-components/Breadcrumb";
import FilterPopover from "../../shared/common-components/FilterPopover";
import { useContext } from "react";
import InternshipContext from "../../shared/store/Context";
import SearchBox from "../../shared/common-components/SearchBox";

const Breadcrumbitems = [
  { title: "Internship", href: "#" },
  { title: "Roadmap", href: "#" },
];

function Roadmap() {
  const { selectedDomains, setSelectedDomains } = useContext(InternshipContext);
  const handleDomainChange = (selected) => {
    setSelectedDomains(selected);
  };
  return (
    <Flex direction="column" className="content-wrapper">
      <Paper className="sub-header-paper">
        <Container className="container-fluid">
          <Flex justify="space-between" align="center" className="sub-header">
            <div>
              <Breadcrumb data={Breadcrumbitems} />
              <Title order={4} mt={5}>Roadmap</Title>
            </div>
            <Flex gap="sm">
              <SearchBox placeholder="Roadmaps" />
              <FilterPopover
                selectedDomains={selectedDomains}
                onDomainChange={handleDomainChange}
              />
              <Link to="add/new">
                <Button leftSection={<IconPlus size={14} />}>
                  Add New Folder
                </Button>
              </Link>
            </Flex>
          </Flex>
        </Container>
      </Paper>
      <Paper className="container-bg">
        <Container className="container-fluid">
          <RoadMapList />
        </Container>
      </Paper>
    </Flex>
  );
}

export default Roadmap;
