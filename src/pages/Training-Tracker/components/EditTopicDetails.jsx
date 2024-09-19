import { Box, Button, Group, Select, TextInput, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconChevronDown } from "@tabler/icons-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import useMentors from "../../Mentors/hooks/useMentors";
import { getBatchRoadmapById, updateBatchRoadmap } from "../../InternshipBatchDetails/components/BatchRoadmap/services/BatchRoadmap.service";

export default function EditTopicDetails(props) {
    const navigate = useNavigate();
    // Get all Mentor details for mentor dropdown
    const [getMentors, mentorData] = useMentors();
    const mentorDropdownData = [];
    // Receive data from the URL
    const { data } = props.roadmapData;
    const { topicId } = props.roadmapData;
    const selectedTopic = data.subTopics.find(item => item.id === topicId);

    // Form Values
    const form = useForm({
        validateInputOnChange: true,
        initialValues: {
            topic: data ? selectedTopic.title : '',
            subtopic: data ? selectedTopic.subtopics : '',
            duration: data ? selectedTopic.duration : '',
            mentor: data ? data.mentor : '',
            status: data ? selectedTopic.status : ''
        }
    });

    // Form Cancel button
    function handleCancel() {
        props.closeDrawer();
        navigate("/tracker");
    }
    // Form Submit button
    function handleFormSubmit(values, id) {
        const subTopics = [...data.subTopics];
        const selectedSubTopicIndex = subTopics.findIndex(
            (subTopic) => subTopic.id === id
        );
        subTopics[selectedSubTopicIndex].status = values.status;
        const copyData = data;
        copyData.subTopics = subTopics;
        updateBatchRoadmap(copyData.id, copyData)
            .then(() => {
                props.closeDrawer();
                navigate("/tracker");
                getBatchRoadmapById(copyData.id);
            });

    }
    // Add Data for Mentor Dropddown
    mentorData
        .filter((record) => record.domain == data.domain)
        .map((mentor) => {
            mentorDropdownData.push(mentor.firstName + " " + mentor.lastName);
        });
    return (
        <form

            style={{ backgroundColor: "white" }}
            onSubmit={form.onSubmit((values) => handleFormSubmit(values, selectedTopic.id))}
        >
            <Box px={24}>
                <TextInput
                    withAsterisk
                    label="Topic"
                    placeholder="Enter Folder Name"
                    {...form.getInputProps("topic")}
                    disabled
                />
                <TextInput
                    mt="md"
                    withAsterisk
                    label="Subtopic"
                    placeholder="Enter Folder Name"
                    {...form.getInputProps("subtopic")}
                    disabled
                />
                <Select
                    mt="md"
                    label="Duration"
                    placeholder="Select Duration"
                    checkIconPosition="right"
                    maxDropdownHeight={200}
                    data={[{ value: "15m", label: "15 minutes" },
                    { value: "30m", label: "30 minutes" },
                    { value: "1hr", label: "1 hour" },
                    { value: "1hr 30m", label: "1 hour 30 min" }]}
                    rightSection={
                        <IconChevronDown
                            style={{ width: rem(16), height: rem(16) }}
                        />

                    }
                    disabled
                    {...form.getInputProps("duration")}
                />
                <Select
                    mt="md"
                    label="Mentor"
                    placeholder="Select Mentor"
                    checkIconPosition="right"
                    data={mentorDropdownData}
                    defaultValue={data.mentor}
                    maxDropdownHeight={200}
                    rightSection={
                        <IconChevronDown
                            style={{ width: rem(16), height: rem(16) }}
                        />
                    }
                    disabled
                    {...form.getInputProps("mentor")}
                />
                <Select
                    mt="md"
                    label="Status"
                    placeholder="Select Status"
                    data={["Not Started", "Completed", "In Progress"]}
                    checkIconPosition="right"
                    maxDropdownHeight={200}
                    rightSection={
                        <IconChevronDown
                            style={{ width: rem(16), height: rem(16) }}
                        />
                    }
                    {...form.getInputProps("status")}
                />
            </Box>
            {/* Drawer footer with action Buttons */}
            <Group style={{ borderTop: "1px solid rgb(222, 226, 230)" }} p={24}  justify="flex-end" mt="xl">
                <Button variant="default" onClick={handleCancel}>
                    Cancle
                </Button>
                <Button type="submit">
                    Edit
                </Button>
            </Group>

        </form>

    )
}