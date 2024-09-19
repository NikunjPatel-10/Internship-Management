import {
  Avatar,
  Box,
  Flex,
  Paper,
  Text,
  Tooltip,
  Container,
  Tabs,
  Title,
} from "@mantine/core";
import { Breadcrumb } from "../../../../../shared/common-components/Breadcrumb";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getInternDetailsById } from "../utility/service/BatchIntern.service";
// import { Dropzone, PDF_MIME_TYPE } from "@mantine/dropzone";
import { IconCalendarEvent, IconMail, IconPhone } from "@tabler/icons-react";
import GeneralDetails from "./GeneralDetails";
import EducationDetails from "./EducationDetails";

export const BatchInternProfile = () => {
  let { id, batchId } = useParams();
  const [batchName, setBatchName] = useState();
  const [activeTab, setActiveTab] = useState("General");
  const [internProfile, setInternProfile] = useState();
  const [copy, setCopy] = useState(false);
  // const [files, setFiles] = useState([]);
  const items = [
    { title: "Internship", href: "#" },
    { title: "Intern-Batch", href: "/intern-batch" },
    { title: `${batchName}`, href: `/intern-batch/details/${batchId}` },
    {
      title: `${
        internProfile?.firstName.charAt(0).toUpperCase() +
        internProfile?.firstName.slice(1) +
        " " +
        internProfile?.lastName.charAt(0).toUpperCase() +
        internProfile?.lastName.slice(1)
      }`,
      href: "#",
    },
  ];

  useEffect(() => {
    if (id) {
      let name = localStorage.getItem("batch_name");
      setBatchName(name);
      getInternDetailsById(id).then((response) => {
        if (response) {
          setInternProfile(response.data);
        }
      });
    }
  }, [id]);

  const copyText = (copyText, copy) => {
    setCopy(copy);
    navigator.clipboard.writeText(copyText);
    setTimeout(() => {
      setCopy(!copy);
    }, 2000);
  };

  return (
    <Flex direction="column" className="content-wrapper">
      <Paper className="sub-header-paper">
        <Container className="container-fluid">
          <Flex justify="space-between" align="center" className="sub-header">
            <div>
              <Breadcrumb data={items} />
              <Title order={4} mt={5}>
                {internProfile?.firstName.charAt(0).toUpperCase() +
                  internProfile?.firstName.slice(1) +
                  " " +
                  internProfile?.lastName.charAt(0).toUpperCase() +
                  internProfile?.lastName.slice(1)}
              </Title>
            </div>
          </Flex>
        </Container>
      </Paper>
      {/* Profile and Tab info */}
      <Paper className="container-bg">
        <Container className="container-fluid">
          {/* Profile Info */}
          <Box className="profile-info" display="flex">
            <Avatar radius="sm" color="cyan" size={100}>
              {internProfile?.firstName.charAt(0).toUpperCase() +
                internProfile?.lastName.charAt(0).toUpperCase()}
            </Avatar>
            <Box ml="lg">
              <Text
                fw={600}
                ff={"Inter, sans-serif"}
                fz={"22px"}
                lh={1}
                style={{ textTransform: "capitalize" }}
              >
                {internProfile?.firstName + " " + internProfile?.lastName}
              </Text>
              <Box mt={"5px"} display={"Flex"}>
                <Tooltip label="Designation">
                  <Text
                    fw={400}
                    fz={"16px"}
                    ff={"Inter, sans-serif"}
                    size="sm"
                    c="gray"
                    lh={1}
                    mt={10}
                    style={{ paddingTop: "3px" }}
                  >
                    {"Intern "}
                    {"|"}
                  </Text>
                </Tooltip>
                <Tooltip label="Domain">
                  <Text
                    fw={400}
                    fz={"16px"}
                    ff={"Inter, sans-serif"}
                    size="sm"
                    c="gray"
                    lh={1}
                    mt={10}
                    style={{ paddingTop: "3px" }}
                  >
                    {"Technology"}
                  </Text>
                </Tooltip>
                <Tooltip label="Sub Domain">
                  <Text
                    fw={400}
                    fz={"16px"}
                    ff={"Inter, sans-serif"}
                    size="sm"
                    c="gray"
                    lh={1}
                    mt={10}
                    style={{ paddingTop: "3px" }}
                  >
                    ({internProfile?.domain})
                  </Text>
                </Tooltip>
              </Box>
              <Box mt={"19px"} display="flex">
                <Tooltip label={copy ? "Copied" : "Email Id"}>
                  <Box
                    display="flex"
                    fw={"bold"}
                    align="center"
                    className="cursorPointer"
                    onClick={() => copyText(internProfile?.email, true)}
                  >
                    <IconMail size={17} color="rgb(0, 91, 169)"></IconMail>
                    <Text
                      fw={"bold"}
                      fz={"14px"}
                      ff={"Inter, sans-serif"}
                      c="gray"
                      lh={1}
                      style={{ paddingLeft: "7px" }}
                    >
                      {internProfile?.email}
                    </Text>
                  </Box>
                </Tooltip>
                <Tooltip label={copy ? "Copied" : "Mobile Number"}>
                  <Box
                    style={{ paddingLeft: "10px" }}
                    display="flex"
                    align="center"
                    className="cursorPointer"
                    onClick={() => copyText(internProfile?.contact, true)}
                  >
                    <IconPhone size={17} color="rgb(21, 170, 191)"></IconPhone>
                    <Text
                      fw={"bold"}
                      ff={"Inter, sans-serif"}
                      fz={"14px"}
                      c="gray"
                      lh={1}
                      style={{ paddingLeft: "7px" }}
                    >
                      {internProfile?.contact}
                    </Text>
                  </Box>
                </Tooltip>
                <Tooltip label="Date of Joining">
                  <Box
                    style={{ paddingLeft: "10px" }}
                    display="flex"
                    align="center"
                  >
                    <IconCalendarEvent size={17} color="rgb(64, 192, 87)" />
                    <Text
                      fw={"bold"}
                      fz={"14px"}
                      ff={"Inter, sans-serif"}
                      c="gray"
                      lh={1}
                      style={{ paddingLeft: "7px" }}
                    >
                      21-05-2024
                    </Text>
                  </Box>
                </Tooltip>
              </Box>
            </Box>
          </Box>
          {/* Tab Container */}
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
              onChange={setActiveTab}
            >
              <Tabs.List>
                <Tabs.Tab h={50} px={32} py={14} fz={15} value="General">
                  General
                </Tabs.Tab>
                <Tabs.Tab h={50} px={32} py={14} fz={15} value="Education">
                  Education
                </Tabs.Tab>
                <Tabs.Tab h={50} px={32} py={14} fz={15} value=" Assessment">
                  Assessment
                </Tabs.Tab>
                <Tabs.Tab h={50} px={32} py={14} fz={15} value="Documents">
                  Documents
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel h={"100%"} p={16} value="General">
                <GeneralDetails/>
              </Tabs.Panel>
              <Tabs.Panel h={"100%"} p={16} value="Education">
              <EducationDetails/>
              </Tabs.Panel>
              <Tabs.Panel h={"100%"} p={16} value=" Assessment">
              Assessment result will be shown here.
              </Tabs.Panel>
              <Tabs.Panel h={"100%"} p={16} value="Documents">
                Documents
              </Tabs.Panel>
            </Tabs>
          </Flex>
        </Container>
      </Paper>
    </Flex>
  );
};
