/* eslint-disable react/prop-types */
import { Button, TextInput, Select, Group, rem, Box } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import {
  addInternDetails,
  getInternDetailsById,
  updateInternDetails,
} from "../utility/service/BatchIntern.service";
import { useEffect } from "react";
import { ValidationSchema } from "../utility/constants/constant";
import { IconChevronDown } from "@tabler/icons-react";
import { useParams } from "react-router-dom";
import useDomain from "../../../../../shared/hooks/useDomain";
import useMentors from "../../../../mentors/hooks/useMentors";

// eslint-disable-next-line react/prop-types
const AddBatchInternForm = ({ closeDrawer, editFormId, setReload }) => {
  let { batchId } = useParams();

  //** Get Domain Data for domain Dropdown */
  const domainData = useDomain();
  const mentorDropdownData = [];

  //** Get all Mentor details for mentor dropdown */
  const [getMentors,mentorData] = useMentors();

  /** useForm Function */
  const form = useForm({
    initialValues: {
      batchId: batchId,
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      mentor: "",
      domain: "",
    },
    transformValues: (values) => ({
      batchId: batchId,
      firstName: `${values.firstName}`,
      lastName: `${values.lastName}`,
      email: `${values.email}`,
      contact: `${values.contact}`,
      mentor: `${values.mentor}`,
      domain: `${values.domain}`,
    }),
    validate: yupResolver(ValidationSchema),
  });

  //** To get all selected values */
  const selectedValues = form.getTransformedValues();

  //** getIntern detail by Id */
  useEffect(() => {
    if (editFormId) {
      getInternDetailsById(editFormId).then((response) => {
        if (response) {
          form.setValues(response.data);
        }
      });
    }
  }, [editFormId]);

  /** when domain change,mentor value null */
  const setMentor = () => {
    if (form.values.domain) {
      form.setFieldValue("mentor", null);
    }
  };

  /** navigate back */
  const handleCancel = () => {
    closeDrawer();
  };

  /** add and update API call */
  const handleFormSubmit = (values) => {
    if (editFormId) {
      updateInternDetails(editFormId, values).then((response) => {
        if (response) {
          form.reset();
          setReload({});
          closeDrawer();
        }
      });
    } else {
      addInternDetails(values).then((response) => {
        if (response) {
          form.reset();
          setReload({});
          closeDrawer();
        }
      });
    }
  };

  //** Add Data for Mentor Dropdown */
  mentorData
    .filter((record) => record.domain == selectedValues.domain)
    .map((mentor) => {
      mentorDropdownData.push(mentor.firstName + " " + mentor.lastName);
    });

  return (
    <>
      <Box>
        <form
          style={{ backgroundColor: "white" }}
          onSubmit={form.onSubmit((values) => handleFormSubmit(values))}
        >
          <TextInput
            withAsterisk
            mt="md"
            label="FirstName"
            placeholder="Enter firstName"
            {...form.getInputProps("firstName")}
          />
          <TextInput
            label="LastName"
            mt="md"
            withAsterisk
            placeholder="Enter lastName"
            {...form.getInputProps("lastName")}
          />

          <TextInput
            withAsterisk
            mt="md"
            label="Email"
            placeholder="Enter email"
            {...form.getInputProps("email")}
          />
          <TextInput
            label="Contact"
            mt="md"
            withAsterisk
            placeholder="Enter contact"
            {...form.getInputProps("contact")}
          />
          <Select
            withAsterisk
            mt="md"
            label="Domain"
            checkIconPosition="right"
            placeholder="Select Domain"
            data={domainData}
            onClick={() => {
              setMentor();
            }}
            rightSection={
              <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
            }
            {...form.getInputProps("domain")}
          />
          {selectedValues.domain && (
            <Select
              mt="md"
              label="Mentor"
              checkIconPosition="right"
              placeholder="Select Mentor"
              data={mentorDropdownData}
              rightSection={
                <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
              }
              {...form.getInputProps("mentor")}
            />
          )}

          <Group style={{borderTop: "1px solid rgb(222, 226, 230)"}} p={24} justify="flex-end" mt="lg">
            <Button variant="default" onClick={handleCancel}>
              Cancle
            </Button>
            <Button type="submit">{editFormId ? "Update" : "Add"}</Button>
          </Group>
        </form>
      </Box>
    </>
  );
};
export default AddBatchInternForm;
