import {
  Button,
  TextInput,
  Textarea,
  Group,
  Flex,
  Select,
  rem,
  em,
  Grid,
  Box,
  Text,
  Divider,
  Paper,
  Container,
  Title,
} from "@mantine/core";
import { IconChevronDown, IconPlus, IconX } from "@tabler/icons-react";
import {
  getRoadmapById,
  updateRoadmap,
} from "../../utility/service/Roadmap.service";
import { isNotEmpty, useForm, yupResolver } from "@mantine/form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCounter, useMediaQuery } from "@mantine/hooks";
import useMentors from "../../../Mentors/hooks/useMentors";
import { Breadcrumb } from "../../../../shared/common-components/Breadcrumb";
import {
  addRoadMapDetails,
  getRoadMapDetails,
  getRoadmapDetailsById,
  updateRoadmapDetails,
} from "../utility/service/RoadmapDetails.service";
import {
  addDuration,
  subtractDurations,
} from "../utility/helper/timeConvertion";
import { addData } from "../utility/helper/addArrayData";
import useRoadmapDetails from "../../../../shared/hooks/useRoadmapDetails";
import { ValidationSchema } from "../utility/validations/Validation";

export default function AddRoadmapDetailsForm() {
  const navigate = useNavigate();
  const { roadmapId, id } = useParams();

  const btnText = id ? "Update" : "Add";
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  // Get all mentor details
  const [getMentors,mentorData] = useMentors();
  const mentorDropdownData = [];
  const [roadmapDetails, setRoadmapDetails] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");
  const [perviousDuratation, setPerviousDuratation] = useState("");
  const raodmapDetailData = useRoadmapDetails();
  const [day, setDay] = useState(1);
  const title = id ? "Update Roadmap Detail" : `Add Roadmap Detail-Day ${day}`;

  useEffect(() => {
    if (raodmapDetailData) {
      let length = raodmapDetailData.filter(
        (data) => data.roadmapId == roadmapId
      ).length;
      setDay(length + 1);
    }
  }, [raodmapDetailData]);
  // Form Values
  const form = useForm({
    initialValues: {
      roadmapId: roadmapId,
      day: `Day ${day}`,
      topics: [
        {
          id: Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, ""),
          topicName: "",
          subtopic: "",
          duration: "",
        },
      ],
    },
    // validate: yupResolver(ValidationSchema),
  });
  const isFormValidate = form.isValid();

  useEffect(() => {
    getRoadmapById(roadmapId).then((res) => {
      setRoadmapDetails(res.data);
    });
  }, []);

  const fields = form.values.topics.map((item, index) => (
    <Box  mt={16}>
      <Flex align="center">
        <Text size="sm" fw={500}>
          Topic {index + 1}
        </Text>
        <Button
          onClick={() => form.removeListItem("topics", index)}
          ml="auto"
          w={28}
          h={28}
          className="btn-sm"
          variant="white"
          leftSection={<IconX color="red" size={16} />}
        ></Button>
      </Flex>
      <Box key={index} style={{border:"1px solid #d0d0d2",borderRadius:"6px"}} p={12} mt={6} >
        <Flex w="100%">
          <TextInput
            w="100%"
            withAsterisk
            label="Topic Name"
            placeholder="Enter Topic"
            {...form.getInputProps(`topics.${index}.topicName`)}
          />
          <Select
            w="100%"
            ml="md"
            label="Duration"
            checkIconPosition="right"
            placeholder="Select Duration"
            value={selectedValue}
            data={["15m", "30m", "1hr", "1hr 30m"]}
            rightSection={
              <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
            }
            {...form.getInputProps(`topics.${index}.duration`)}
          />
        </Flex>
        <Textarea
          mt="sm"
          label="SubTopic"
          withAsterisk
          placeholder="Enter Description about topic"
          {...form.getInputProps(`topics.${index}.subtopic`)}
        />
      </Box>
      {/* <Divider my="xs" /> */}
    </Box>
  ));

  function addComponent() {
    form.insertListItem("topics", {
      id: Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, ""),
      topicName: "",
      subtopic: "",
      duration: "",
    });
  }
  const calculateTotalDuration = (data) => {
    let totalMinutes = 0;
    data.forEach((item) => {
      const durationParts = item.duration.split(" ");
      let durationInMinutes = 0;
      durationParts.forEach((part) => {
        if (part.includes("hr")) {
          durationInMinutes += parseInt(part.replace("hr", "")) * 60;
        } else if (part.includes("m")) {
          durationInMinutes += parseInt(part.replace("m", ""));
        }
      });
      totalMinutes += durationInMinutes;
    });
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}hr ${minutes}m`;
  };

  // Form Submit button
  function handleFormSubmit(values) {
    const totalDuration = calculateTotalDuration(values.topics);
    let totalDur = roadmapDetails.totalDuration;

    if (id) {
      // If ID is present, update the existing roadmap
      updateRoadmapDetails(id, values);

      // Remove the old duration from total duaration
      const tempData = subtractDurations(totalDur, perviousDuratation);

      // Add new duration to total duration
      const upDatedDuration = addDuration(tempData, totalDuration);

      // Update totalDuration in roadmap
      updateRoadmap(roadmapId, {
        ...roadmapDetails,
        totalDuration: upDatedDuration,
        totalDays: day,
      });
    } else {
      // If no ID is present, add a new roadmap

      values.day = `Day ${day}`;
      addRoadMapDetails(values);
      // updateRoadmapDetails(id, { ...values, id: Math.random() });
      // // Add new duration to total duration
      const upDatedDuration = addDuration(totalDur, totalDuration);

      // // Update totalDuration in roadmap
      updateRoadmap(roadmapId, {
        ...roadmapDetails,
        totalDuration: upDatedDuration,
        totalDays: day,
      });
    }

    navigate("/roadmap-details/" + roadmapId);
  }

  useEffect(() => {
    const fetchRoadmapDetails = async () => {
      if (id) {
        try {
          // Fetch mentor details by ID
          const roadmapDetails = await getRoadmapDetailsById(id);

          // Populate the form with fetched details
          form.setValues(roadmapDetails.data);
          // Get total of all duration before update
          const newData = addData(roadmapDetails.data.topics);

          setPerviousDuratation(newData);
        } catch (error) {
          console.error("Error fetching roadmap details:", error);
        }
      }
    };

    fetchRoadmapDetails();
  }, [id]);

  // Breadcrumbs Data
  const Breadcrumbitems = [
    { title: "Internship", href: "#" },
    { title: "Roadmap", href: "/roadmap" },
    { title: "Roadmap Details", href: "/roadmap" },
    { title: `${btnText} Roadmap Details` },
  ];

  function handleCancel() {
    navigate("/roadmap-details/" + roadmapId);
  }

  mentorData.map((mentor) => {
    mentorDropdownData.push(mentor.firstName + " " + mentor.lastName);
  });
  return (
    <>
      <Flex direction="column" className="content-wrapper">
        <Paper className="sub-header-paper">
          <Container className="container-fluid">
            <Flex justify="space-between" align="center" className="sub-header">
              <div>
                <Breadcrumb data={Breadcrumbitems} />
                <Title order={4} mt={5}>{title}</Title>
              </div>
            </Flex>
          </Container>
        </Paper>
        <Paper className="container-bg">
          <Container className="container-fluid">
            <Box className="form-wrapper" h={"100%"} display={"flex"} p={16}>
              <Grid w="100%" columns={24}>
                <Grid.Col
                  style={{ height: "100%" }}
                  span={isMobile ? "24" : "14"}
                >
                  <form
                    className="add-form"
                    style={{ backgroundColor: "white", paddingTop: "0" }}
                    onSubmit={form.onSubmit((values) =>
                      handleFormSubmit(values)
                    )}
                  >
                    {/* Render all existing components */}
                    {fields}

                    <Button
                      my="sm"
                      className="btn-sm"
                      variant="white"
                      leftSection={<IconPlus size={14} />}
                      onClick={() => addComponent()}
                    >
                      Add Topic
                    </Button>
                    <Divider />
                    <Group justify="flex-end" mt="lg">
                      <Button
                        variant="default"
                        onClick={handleCancel}
                        type="submit"
                      >
                        Cancle
                      </Button>
                      <Button disabled={!isFormValidate} type="submit">
                        {btnText}
                      </Button>
                    </Group>
                  </form>
                </Grid.Col>
              </Grid>
            </Box>
          </Container>
        </Paper>
      </Flex>
    </>
  );
}
