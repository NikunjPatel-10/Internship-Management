import { Box, Button, Group, Select, TextInput, rem } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

// eslint-disable-next-line react/prop-types
export const EditEducationDetailForm = ({ closeDrawer }) => {
  /** navigate back */
  const handleCancel = () => {
    closeDrawer();
  };
  return (
    <form
      style={{
        backgroundColor: "white",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      //   onSubmit={form.onSubmit((values) => handleFormSubmit(values))}
    >
      <Box
        style={{
          overflow: "auto",
          borderBottom: "1px solid rgb(222, 226, 230)",
          flexGrow:1
        }}
        px="16px"
        py="5px"
        mt={"xs"}
        mb={"lg"}
      >
        <Select
          mt="md"
          label="Academic Level"
          checkIconPosition="right"
          placeholder="Select Academic Level"
          data={[
            "School",
            "College",
            "Undergraduate",
            "Graduate",
            "Postgraduate",
            "Doctorate",
          ]}
          // onClick={() => {
          //   setMentor();
          // }}
          rightSection={
            <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
          }
          // {...form.getInputProps("domain")}
        />
        <TextInput
          mt="md"
          label="Institute Name"
          placeholder="Enter Institute Name"
          //   {...form.getInputProps("batchname")}
        />
        <TextInput
          mt="md"
          label="Board/University Name"
          placeholder="Enter Board/University Name"
          //   {...form.getInputProps("batchname")}
        />
        <TextInput
          mt="md"
          label="Degree Title"
          placeholder="E.g. Secondary, Higher-Secondary, Bachelor's in ..., Master's in ..., etc"
          //   {...form.getInputProps("batchname")}
        />
        <TextInput
          mt="md"
          label="Academic Discipline(Optional)"
          placeholder="E.g. Business, Technology, Medical"
          //   {...form.getInputProps("batchname")}
        />
      </Box>
      <Group justify="flex-end" mb="lg" px="md">
        <Button variant="default" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </Group>
    </form>
  );
};
