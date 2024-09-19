import React, { useContext, useState, useEffect } from "react";
import { Button, Container, Flex, Paper, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import MentorList from "./components/MentorList";
import SearchBox from "../../shared/common-components/SearchBox";
import useMentors from "./hooks/useMentors";
import InternshipContext from "../../shared/store/Context";
import useSearch from "../../shared/hooks/useSearch";
import FilterPopover from "../../shared/common-components/FilterPopover";
import useFilterData from "../../shared/hooks/useFilterData";
import { Breadcrumb } from "../../shared/common-components/Breadcrumb";
import { IconPlus } from "@tabler/icons-react";
const MentorDetails = () => {
  const [getMentors,mentorData] = useMentors();
  const [mentors, setMentors] = useState(mentorData);
  const { searchTerm } = useContext(InternshipContext);
  const [selectedDomains, setSelectedDomains] = useState([]);

  const Breadcrumbitems = [
    { title: "Internship", href: "#" },
    { title: "Mentors", href: "#" },
  ];
  // toggle drawer
  const toggleDrawer = () => {
    setDrawerOpen((prevState) => !prevState);
  };
  useEffect(() => {
    // Merge firstName and lastName into fullName for searching
    const modifiedData = mentorData.map((item) => ({
      ...item,
      mentor: `${item.firstName} ${item.lastName}`, // Concatenate firstName and lastName
    }));

    // Define the keys for searching
    const searchKeys = ["mentor", "email", "domain"];

    // Use the useSearch hook with the modified data and searchKeys
    const filteredMentors = useSearch(modifiedData, searchTerm, searchKeys);
    setMentors(filteredMentors);
  }, [mentorData, searchTerm]);

  const handleDomainChange = (selected) => {
    setSelectedDomains(selected);
  };
  // Apply filtering based on selected domains
  const filteredMentors = useFilterData(mentors, selectedDomains);

  // filter deleted data
  const handleDelete = (id) =>
    setMentors(mentors.filter((data) => data.id !== id));
  return (
    <Flex direction="column" className="content-wrapper">
      <Paper className="sub-header-paper">
        <Container className="container-fluid">
          <Flex justify="space-between" align="center" className="sub-header">
            <div>
              <Breadcrumb data={Breadcrumbitems} />
              <Title order={4} mt={5}>Mentors</Title>
            </div>
            <Flex gap="sm">
              <SearchBox placeholder="Mentors" />
              <FilterPopover
                selectedDomains={selectedDomains}
                onDomainChange={handleDomainChange}
              />
              <Link to="/mentor/add/new">
                <Button leftSection={<IconPlus size={14} />}>
                  Add New Mentor
                </Button>
              </Link>
            </Flex>
          </Flex>
        </Container>
      </Paper>
      {/* Component to display mentor details */}
      <Paper className="container-bg">
        <Container className="container-fluid">
          <MentorList
            mentors={filteredMentors}
            toggleDrawer={toggleDrawer}
            handleDelete={handleDelete}
            getMentorData={getMentors}
          />
        </Container>
      </Paper>
    </Flex>

    // <Flex p="lg" direction="column">
    //   <Flex justify="space-between">
    //     {/* Title for mentor details page */}
    //     <Text>Mentor's Detail</Text>
    //     <Flex>
    //       <SearchBox />
    //       <FilterPopover
    //         selectedDomains={selectedDomains}
    //         onDomainChange={handleDomainChange}
    //       />
    //       {/* Button for adding mentor details */}
    //       <Link to="/mentor/add/new">
    //         <Button>Add Mentor</Button>
    //       </Link>
    //     </Flex>
    //   </Flex>
    //   {/* Component to display mentor details */}
    //   <MentorList mentors={filteredMentors} />
    // </Flex>
  );
};

export default MentorDetails;
