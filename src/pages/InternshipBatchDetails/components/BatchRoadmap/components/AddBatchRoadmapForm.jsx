import { Button, Group, Select, rem, Box, Divider } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { isNotEmpty, useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useMentors from "../../../../Mentors/hooks/useMentors";
import {
  addBatchRoadMap,
  getBatchRoadmapById,
  updateBatchRoadmap,
} from "../services/BatchRoadmap.service";
import useRoadmap from "../../../../../shared/hooks/useRoadmap";
import useDomain from "../../../../../shared/hooks/useDomain";
import useRoadmapDetails from "../../../../../shared/hooks/useRoadmapDetails";

export default function AddBatchRoadmapForm({ closeDrawer, setRefresh ,getData}) {
  const navigate = useNavigate();
  const { batchId, id } = useParams();
  const btnText = id ? "Update" : "Add";
  const roadmapDetailsData = useRoadmapDetails();
  // Get all Roadmap topics for topic dropdown
  const roadmapData = useRoadmap();
  const roadmapDropdownData = [];
  // Get all Mentor details for mentor dropdown
  const [getMentors,mentorData] = useMentors();
  const mentorDropdownData = [];
  //   Get Domain Data for doamin Dropdown
  const domainData = useDomain();

  // Form Values
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      batchId: batchId,
      topic: "",
      domain: "",
      duration: "",
      mentor: "",
      day: "",
      roadmapId: "",
      status: "",
      subTopics: [],
    },
    transformValues: (values) => ({
      batchId: batchId,
      topic: `${values.topic}`,
      domain: `${values.domain}`,
      duration: `${values.duration}`,
      mentor: `${values.mentor}`,
      day: `${values.day}`,
      roadmapId: `${values.roadmapId}`,
      status: `${values.status}`,
      subTopics: values.subTopics,
    }),
    // validate: {
    //   // Empty strings are considered to be invalid
    //   topic: isNotEmpty("Topic cannot be empty"),
    //   domain: isNotEmpty("Subtopic cannot be empty"),
    //   mentor: isNotEmpty("Duration cannot be empty"),
    // },
  });
  const isFormValidate = form.isValid();
  //   To Get All selected Values
  const selectedValues = form.getTransformedValues();

  // Form Submit button
  async function handleFormSubmit(values) {
    //  Find the duration based on selected value
    const selectedOption = roadmapData.find(
      (option) => option.name === selectedValues.topic
    );

    // Storing Subtopics in temp Array
    const tempArrayForSubtopics = [];
    roadmapDetailsData
      .filter((batch) => batch.roadmapId === selectedOption.id)
      .map((roadmap) => {
        roadmap.topics.map((data, index) => {
          tempArrayForSubtopics.push({ ...data, day: roadmap.day });
        });
      });

    // Function to generate a unique ID
    function generateUniqueId() {
      // Use a combination of a random number
      const randomStr = Math.random().toString(36).substring(2, 8);
      return randomStr;
    }
    console.log("first", tempArrayForSubtopics);
    // Storing Subtopics array in updatedSubtopic
    const updatedSubtopics = tempArrayForSubtopics.map((data) => ({
      id: generateUniqueId(),
      status: "Not Started",
      title: data.topicName,
      subtopics: data.subtopic,
      duration: data.duration,
      topicid: data.id,
      day: parseInt(data.day.match(/\d+/)[0]),
    }));
    // Set duration field
    const newValues = {
      ...values,
      duration: selectedOption.totalDuration,
      day: selectedOption.totalDays,
      roadmapId: selectedOption.id,
      subTopics: updatedSubtopics,
    };
    if (id) {
      // If ID is present, update the existing roadmap
      await updateBatchRoadmap(id, newValues);
      setRefresh({});
    } else {
      // If no ID is present, add a new roadmap
      await addBatchRoadMap(newValues);
      setRefresh({});
    }
    closeDrawer();
    getData();
    navigate("/intern-batch/details/" + batchId);
  }

  useEffect(() => {
    const fetchRoadmapDetails = async () => {
      if (id) {
        try {
          // Fetch Roadmap details by ID
          const roadmapDetails = await getBatchRoadmapById(id);
          // Populate the form with fetched details
          form.setValues(roadmapDetails.data);
        } catch (error) {
          console.error("Error fetching roadmap details:", error);
        }
      }
    };
    fetchRoadmapDetails();
  }, [id]);

  function handleCancel() {
    closeDrawer();
    navigate("/intern-batch/details/" + batchId);
  }

  // Add Data for Mentor Dropddown
  mentorData
    .filter((record) => record.domain == selectedValues.domain)
    .map((mentor) => {
      mentorDropdownData.push(mentor.firstName + " " + mentor.lastName);
    });

  // Add Data for Topic Dropddown
  roadmapData
    .filter((record) => record.domain == selectedValues.domain)
    .map((data) => {
      roadmapDropdownData.push(data.name);
    });
  return (
    <>
      <Box>
        <form
          style={{ backgroundColor: "white" }}
          onSubmit={form.onSubmit((values) => handleFormSubmit(values))}
        >
          {/* Domain Dropdown */}
          <Select
            mt="md"
            label="Select Domain"
            placeholder="Select Domain"
            checkIconPosition="right"
            data={domainData}
            maxDropdownHeight={180}
            rightSection={
              <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
            }
            {...form.getInputProps("domain")}
          />
          {/* Conditionnal based rendering, If we select Domain then only other dropdowns are visible */}
          {selectedValues.domain && (
            <>
              {/* Roadmap Dropdown */}
              <Select
                mt="md"
                disabled={!selectedValues.domain}
                label="Select Roadmap"
                placeholder="Select Roadmap"
                checkIconPosition="right"
                data={roadmapDropdownData}
                // data={roadmapDropdownData.map((entry) => entry.name)}
                maxDropdownHeight={200}
                rightSection={
                  <IconChevronDown
                    style={{ width: rem(16), height: rem(16) }}
                  />
                }
                {...form.getInputProps("topic")}
              />
              {/* Mentor Dropdown */}
              <Select
                mt="md"
                disabled={!selectedValues.domain}
                label="Select Mentor"
                placeholder="Select Mentor"
                checkIconPosition="right"
                data={mentorDropdownData}
                maxDropdownHeight={200}
                rightSection={
                  <IconChevronDown
                    style={{ width: rem(16), height: rem(16) }}
                  />
                }
                {...form.getInputProps("mentor")}
              />
              {/* Drawer footer with action Buttons */}
              <Group style={{borderTop: "1px solid rgb(222, 226, 230)"}} p={24} justify="flex-end" mt="xl">
             
                <Button variant="default" onClick={handleCancel}>
                  Cancle
                </Button>
                <Button disabled={!isFormValidate} type="submit">
                  {btnText}
                </Button>
              </Group>
            </>
          )}
        </form>
      </Box>
    </>
  );
}
