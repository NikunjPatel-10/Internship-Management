import { Box, Button, Checkbox, Group, Select, rem } from "@mantine/core";
import { useEffect, useState } from "react";
import useDomain from "../../../../../shared/hooks/useDomain";
import { useForm } from "@mantine/form";
import { useNavigate, useParams } from "react-router";
import { IconChevronDown } from "@tabler/icons-react";
import useMentors from "../../../../mentors/hooks/useMentors";
import {
  addBatchMentor,
  getBatchMentorById,
  updateBatchMentor,
} from "../utility/services/BatchMentor.service";
import useBatchMentor from "../hooks/useBatchMentor";
import { updateDomainOwner } from "../utility/helper/updateDomainOwner";

const AddBatchMentorForm = ({ closeDrawer, getMentorData }) => {
  const navigate = useNavigate();
  // get param values using URL
  const { id, batchId } = useParams();
  // get all domain data
  const domainData = useDomain();
  // get all mentors data
  const [getMentors,mentorsData] = useMentors();
  // get selected batch mentor data
  const batchMentor = useBatchMentor();
  // to store mentors data for selected batch
  const [mentors, setMentors] = useState([]);
  // set button text of form
  const btnText = id ? "Update" : "Add";
  // create form with initial values
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      batchId: batchId,
      domain: "",
      mentor: "",
      domainOwner: false,
    },
    transformValues: (values) => ({
      batchId: batchId,
      domain: `${values.domain}`,
      mentor: `${values.mentor}`,
      domainOwner: `${values.domainOwner}`,
    }),
  });
  const isFormValidate = form.isValid();
  const selectedValues = form.getTransformedValues();

  // Close drawer on click of cancel icon
  function handleCancel() {
    closeDrawer();
    navigate("/intern-batch/details/" + batchId);
  }

  useEffect(() => {
    // filter mentors according to selected domain value
    const data = mentorsData
      .filter((record) => record.domain == selectedValues.domain)
      .map((mentor) => mentor.firstName + " " + mentor.lastName);
    setMentors(data);
  }, [domainData, mentorsData, selectedValues.domain]);

  // submit values on click of add/update button
   const  handleFormSubmit = (values) => {
    // find selected mentor data object
    const selectedOption = mentorsData.find(
      (option) =>
        option.firstName + " " + option.lastName == selectedValues.mentor
    );
    // add emailId of selected mentor
    const newValues = { ...values, email: selectedOption.email };
    if (id) {
      // If ID is present, update the existing mentor
      if (newValues.domainOwner) {
        // update domain owner value to false
        const updatedMentors = updateDomainOwner(newValues.domain, batchMentor);
        Promise.all(updatedMentors).then(() => {
          updateBatchMentor(id, newValues);
                 });
      } else {
         updateBatchMentor(id, newValues);
             }
    } else {
      // If no ID is present, add a new mentor
      if (form.values.domainOwner) {
        // update domain owner value to false
        const updatedMentors = updateDomainOwner(
          form.values.domain,
          batchMentor
        );
        Promise.all(updatedMentors).then(() => {
         addBatchMentor(newValues);
                 });
      } else {
        addBatchMentor(newValues);
             }
    }
    closeDrawer();
    getMentorData();
    navigate("/intern-batch/details/" + batchId);
  };

  // Handle domain owner field value
  const handleCheckBox = (event) => {
    form.setFieldValue("domainOwner", event.target.checked);
  };
  useEffect(() => {
    const fetchMentorData = async () => {
      if (id) {
        try {
          // Fetch mentor details by ID
          const mentorDetails = await getBatchMentorById(id);
          console.log(mentorDetails);
          // Populate the form with fetched details
          form.setValues(mentorDetails.data);
        } catch (error) {
          console.error("Error fetching mentor details:", error);
        }
      }
    };
    fetchMentorData();
  }, [id]);
  return (
    <Box>
      {/* Start: Form to add mentor in batch*/}
      <form
        style={{ backgroundColor: "white" }}
        onSubmit={form.onSubmit((values) => handleFormSubmit(values))}
      >
        {/* Dropdown menu to select domain value*/}
        <Select
          mt="md"
          label="Select Domain"
          placeholder="Select Domain"
          checkIconPosition="right"
          data={domainData}
          rightSection={
            <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
          }
          {...form.getInputProps("domain")}
        />

        {/* If domain is selected show mentor list for selected domain in dropdown menu */}
        {selectedValues.domain && (
          <>
            <Select
              mt="md"
              label="Select Mentor"
              placeholder="Select Mentor"
              checkIconPosition="right"
              data={mentors}
              maxDropdownHeight={200}
              rightSection={
                <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
              }
              {...form.getInputProps("mentor")}
            ></Select>

            {/* Checkbox to set domain owner */}
            <Checkbox
              label="Set as Domain Owner"
              mt="md"
              {...form.getInputProps("domainOwner", {
                type: "checkbox",
              })}
              onChange={handleCheckBox}
            >
              Set as Domain Owner
            </Checkbox>
            <Group style={{borderTop: "1px solid rgb(222, 226, 230)"}} p={24} justify="flex-end" mt="xl">
              {/* Cancel button to close drawer*/}
              <Button variant="default" onClick={handleCancel}>
                Cancel
              </Button>
              {/* Submit button to submit values */}
              <Button disabled={!isFormValidate} type="submit">
                {btnText}
              </Button>
            </Group>
          </>
        )}
      </form>
      {/* Start: Form to add mentor in batch*/}
    </Box>
  );
};

export default AddBatchMentorForm;
