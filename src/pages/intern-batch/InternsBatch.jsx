import { Flex, Button, Group, Container, Paper, Title } from "@mantine/core";
import { Breadcrumb } from "../../shared/common-components/Breadcrumb";
import { Link } from "react-router-dom";
import { IconPlus } from "@tabler/icons-react";
import { InternsBatchTable } from "./components/InternsBatchTable";
import SearchBox from "../../shared/common-components/SearchBox";

const items = [
  { title: "Internship", href: "#" },
  { title: "Intern-Batch", href: "/intern-batch" },
];

export const InternsBatch = () => {
  return (
    <Flex direction="column" className="content-wrapper">
      <Paper className="sub-header-paper">
        <Container className="container-fluid">
          <Flex justify="space-between" align="center" className="sub-header">
            <div>
              <Breadcrumb data={items} />
              <Title order={4} mt={5}>InternBatch</Title>
            </div>
            <Group>
              <SearchBox placeholder="Internship Batch" />
              <Link to="batch/add/new">
                <Button leftSection={<IconPlus size={14} />}>
                  Add New Batch
                </Button>
              </Link>
            </Group>
          </Flex>
        </Container>
      </Paper>
      <InternsBatchTable />
    </Flex>
  );
};
