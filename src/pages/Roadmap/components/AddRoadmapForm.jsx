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
  Paper,
  Container,
  Title,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import {
  addRoadMap,
  updateRoadmap,
  getRoadmapById,
} from "../utility/service/Roadmap.service";
import { isNotEmpty, useForm, yupResolver } from "@mantine/form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
// import useMentors from "../../mentors/hooks/useMentors";
import { Breadcrumb } from "../../../shared/common-components/Breadcrumb";
import useDomain from "../../../shared/hooks/useDomain";
import { ValidationSchema } from "../utility/validations/Validation";

// import { getRoadMapDetails } from "../Roadmap-Details/service/RoadmapDetails.service";

export default function FormModal() {
  const navigate = useNavigate();
  const { id } = useParams();
  const title = id ? "Update Folder" : "Add Folder";
  const btnText = id ? "Update" : "Add";
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  // Get all Domain details
  const domainData = useDomain();

  // Form Values
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      name: "",
      domain: "",
      totalDuration: "0hr 0m",
      totalDays: 0,
    },

    validate: yupResolver(ValidationSchema),
  });
  const isFormValidate = form.isValid();

  // Form Submit button
  function handleFormSubmit(values) {
    // const updatedData = { ...values, totalDuration: duration };
    if (id) {
      // If ID is present, update the existing roadmap
      updateRoadmap(id, values);
    } else {
      // If no ID is present, add a new roadmap
      addRoadMap(values);
    }
    navigate("/roadmap");
  }

  useEffect(() => {
    const fetchRoadmapDetails = async () => {
      if (id) {
        try {
          // Fetch mentor details by ID
          const roadmapDetails = await getRoadmapById(id);

          // Populate the form with fetched details
          form.setValues(roadmapDetails.data);
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
    { title: `${btnText} Folder` },
  ];

  function handleCancel() {
    navigate("/roadmap");
  }

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
                  span={isMobile ? "24" : "12"}
                >
                  <form
                    className="add-form"
                    style={{ backgroundColor: "white" }}
                    onSubmit={form.onSubmit((values) =>
                      handleFormSubmit(values)
                    )}
                  >
                    <TextInput
                      withAsterisk
                      label="Name"
                      placeholder="Enter Folder Name"
                      {...form.getInputProps("name")}
                    />

                    <Select
                      mt="md"
                      label="Select Domain"
                      placeholder="Select Domain"
                      checkIconPosition="right"
                      data={domainData}
                      maxDropdownHeight={200}
                      rightSection={
                        <IconChevronDown
                          style={{ width: rem(16), height: rem(16) }}
                        />
                      }
                      {...form.getInputProps("domain")}
                    />

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
