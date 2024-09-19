import {
  Accordion,
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Group,
  Menu,
  ScrollArea,
  SimpleGrid,
  Table,
  Title,
  Tooltip,
  UnstyledButton,
  rem,
  Text,
} from "@mantine/core";
import {
  IconChevronDown,
  IconChevronUp,
  IconDotsVertical,
  IconMail,
  IconPhone,
  IconSelector,
} from "@tabler/icons-react";
import MenuDropdown from "./MenuDropdown";
import useSort from "../../../shared/hooks/useSort";
import { AccordionUI } from "../../../shared/common-components/AccordionUI";
import { groupedData } from "../../InternshipBatchDetails/utility/groupedData";
import NoRecordsFound from "../../../shared/common-components/NoRecordsFound";

const MentorList = ({ toggleDrawer, mentors, handleDelete ,getMentorData}) => {
  // Group mentors by domain
  const groupedMentors = groupedData(mentors);

  return (
    <Box mt={16} className="mentors-accordion">
      {mentors.length == 0 ? (
        <NoRecordsFound></NoRecordsFound>
      ) : (
        <AccordionUI
          tabValue="mentors"
          data={groupedMentors}
          toggleDrawer={toggleDrawer}
          getData={getMentorData}
        />
      )}
    </Box>
  );
};

export default MentorList;
